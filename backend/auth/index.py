import json
import os
import hashlib
import secrets
from typing import Dict, Any, Optional
from datetime import datetime, timedelta
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    '''
    Business: Create database connection
    Returns: psycopg2 connection object
    '''
    return psycopg2.connect(
        os.environ['DATABASE_URL'],
        cursor_factory=RealDictCursor
    )

def hash_password(password: str) -> str:
    '''Hash password using SHA256'''
    return hashlib.sha256(password.encode()).hexdigest()

def generate_token() -> str:
    '''Generate random session token'''
    return secrets.token_urlsafe(32)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Handle user registration, login, and profile operations
    Args: event - dict with httpMethod, body, headers
          context - object with request_id, function_name
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    path = event.get('queryStringParameters', {}).get('action', '')
    
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        if method == 'POST' and path == 'register':
            body = json.loads(event.get('body', '{}'))
            email = body.get('email', '').strip()
            password = body.get('password', '').strip()
            full_name = body.get('full_name', '').strip()
            phone = body.get('phone', '').strip()
            
            if not email or not password or not full_name:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Email, password and full_name are required'}),
                    'isBase64Encoded': False
                }
            
            cur.execute("SELECT id FROM user_profiles WHERE email = %s", (email,))
            existing = cur.fetchone()
            
            if existing:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Email already registered'}),
                    'isBase64Encoded': False
                }
            
            password_hash = hash_password(password)
            token = generate_token()
            
            cur.execute(
                "INSERT INTO user_profiles (email, full_name, phone, notes) VALUES (%s, %s, %s, %s) RETURNING id",
                (email, full_name, phone, password_hash)
            )
            user_id = cur.fetchone()['id']
            conn.commit()
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'user_id': user_id,
                    'token': token,
                    'email': email,
                    'full_name': full_name
                }),
                'isBase64Encoded': False
            }
        
        elif method == 'POST' and path == 'login':
            body = json.loads(event.get('body', '{}'))
            email = body.get('email', '').strip()
            password = body.get('password', '').strip()
            
            if not email or not password:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Email and password are required'}),
                    'isBase64Encoded': False
                }
            
            password_hash = hash_password(password)
            
            cur.execute(
                "SELECT id, email, full_name, phone, city, birth_date, avatar_url, preferred_bike_type FROM user_profiles WHERE email = %s AND notes = %s AND is_active = true",
                (email, password_hash)
            )
            user = cur.fetchone()
            
            cur.close()
            conn.close()
            
            if not user:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Invalid email or password'}),
                    'isBase64Encoded': False
                }
            
            token = generate_token()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'token': token,
                    'user': dict(user)
                }),
                'isBase64Encoded': False
            }
        
        elif method == 'GET' and path == 'profile':
            auth_token = event.get('headers', {}).get('X-Auth-Token', '')
            user_email = event.get('queryStringParameters', {}).get('email', '')
            
            if not user_email:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Email is required'}),
                    'isBase64Encoded': False
                }
            
            cur.execute(
                "SELECT id, email, full_name, phone, city, birth_date, avatar_url, preferred_bike_type, created_at FROM user_profiles WHERE email = %s AND is_active = true",
                (user_email,)
            )
            user = cur.fetchone()
            
            cur.close()
            conn.close()
            
            if not user:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'User not found'}),
                    'isBase64Encoded': False
                }
            
            user_dict = dict(user)
            if user_dict.get('birth_date'):
                user_dict['birth_date'] = str(user_dict['birth_date'])
            if user_dict.get('created_at'):
                user_dict['created_at'] = str(user_dict['created_at'])
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'user': user_dict}),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT' and path == 'profile':
            body = json.loads(event.get('body', '{}'))
            email = body.get('email', '').strip()
            
            if not email:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Email is required'}),
                    'isBase64Encoded': False
                }
            
            updates = []
            params = []
            
            if 'full_name' in body:
                updates.append("full_name = %s")
                params.append(body['full_name'])
            if 'phone' in body:
                updates.append("phone = %s")
                params.append(body['phone'])
            if 'city' in body:
                updates.append("city = %s")
                params.append(body['city'])
            if 'birth_date' in body:
                updates.append("birth_date = %s")
                params.append(body['birth_date'])
            if 'preferred_bike_type' in body:
                updates.append("preferred_bike_type = %s")
                params.append(body['preferred_bike_type'])
            if 'avatar_url' in body:
                updates.append("avatar_url = %s")
                params.append(body['avatar_url'])
            
            updates.append("updated_at = CURRENT_TIMESTAMP")
            params.append(email)
            
            query = f"UPDATE user_profiles SET {', '.join(updates)} WHERE email = %s RETURNING id"
            cur.execute(query, params)
            result = cur.fetchone()
            conn.commit()
            
            cur.close()
            conn.close()
            
            if not result:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'User not found'}),
                    'isBase64Encoded': False
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'message': 'Profile updated'}),
                'isBase64Encoded': False
            }
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid action'}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
