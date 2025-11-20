import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const motorcycles = [
    {
      id: 1,
      name: 'Yamaha YZF-R1',
      price: '2 450 000',
      category: 'Спорт',
      power: '200 л.с.',
      image: 'https://cdn.poehali.dev/projects/bb964095-898a-4d76-bc30-68e31e817f3f/files/0deac47f-6653-460f-a572-153ccc72b935.jpg',
      badge: 'Хит продаж'
    },
    {
      id: 2,
      name: 'Kawasaki Ninja H2',
      price: '3 200 000',
      category: 'Спорт',
      power: '231 л.с.',
      image: 'https://cdn.poehali.dev/projects/bb964095-898a-4d76-bc30-68e31e817f3f/files/53b34b8b-2897-48fd-b16a-69b8ed3a08dc.jpg',
      badge: 'Новинка'
    },
    {
      id: 3,
      name: 'Honda CBR1000RR',
      price: '2 100 000',
      category: 'Спорт',
      power: '189 л.с.',
      image: 'https://cdn.poehali.dev/projects/bb964095-898a-4d76-bc30-68e31e817f3f/files/0deac47f-6653-460f-a572-153ccc72b935.jpg',
      badge: 'Скидка -15%'
    }
  ];

  const services = [
    { icon: 'Wrench', title: 'Техобслуживание', desc: 'Полный спектр работ по ТО мотоциклов' },
    { icon: 'Settings', title: 'Ремонт', desc: 'Профессиональный ремонт любой сложности' },
    { icon: 'Gauge', title: 'Диагностика', desc: 'Компьютерная диагностика всех систем' },
    { icon: 'Sparkles', title: 'Тюнинг', desc: 'Индивидуальная доработка мотоциклов' }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Bike" className="text-primary" size={32} />
              <span className="text-2xl font-montserrat font-bold">RollingMoto</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => setActiveSection('home')} className="hover:text-primary transition-colors">Главная</button>
              <button onClick={() => setActiveSection('catalog')} className="hover:text-primary transition-colors">Каталог</button>
              <button onClick={() => setActiveSection('about')} className="hover:text-primary transition-colors">О нас</button>
              <button onClick={() => setActiveSection('services')} className="hover:text-primary transition-colors">Услуги</button>
              <button onClick={() => setActiveSection('credit')} className="hover:text-primary transition-colors">Кредит</button>
              <button onClick={() => setActiveSection('promo')} className="hover:text-primary transition-colors">Акции</button>
              <button onClick={() => setActiveSection('contacts')} className="hover:text-primary transition-colors">Контакты</button>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Icon name="Phone" size={18} className="mr-2" />
              +7 (495) 123-45-67
            </Button>
          </div>
        </div>
      </nav>

      <section className="pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <Badge className="bg-primary/20 text-primary border-primary/30">Мотосалон премиум-класса</Badge>
              <h1 className="text-5xl md:text-7xl font-montserrat font-bold leading-tight">
                Почувствуй
                <span className="text-primary"> свободу</span> на дороге
              </h1>
              <p className="text-xl text-muted-foreground">
                Широкий выбор спортивных и туристических мотоциклов. Кредит от 0%. Сервисное обслуживание.
              </p>
              <div className="flex gap-4">
                <Button onClick={() => setActiveSection('catalog')} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Смотреть каталог
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
                <Button onClick={() => setActiveSection('contacts')} size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Записаться на тест-драйв
                </Button>
              </div>
              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-primary">150+</div>
                  <div className="text-sm text-muted-foreground">Моделей в наличии</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">5 лет</div>
                  <div className="text-sm text-muted-foreground">На рынке</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">3000+</div>
                  <div className="text-sm text-muted-foreground">Довольных клиентов</div>
                </div>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <img 
                src="https://cdn.poehali.dev/projects/bb964095-898a-4d76-bc30-68e31e817f3f/files/c20e7727-6386-440d-9acd-a4972b3bd405.jpg" 
                alt="Hero motorcycle"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {activeSection === 'catalog' && (
        <section className="py-16 px-4 animate-fade-in" id="catalog">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Каталог</Badge>
              <h2 className="text-4xl font-montserrat font-bold mb-4">Наши мотоциклы</h2>
              <p className="text-muted-foreground text-lg">Выбери свою мечту из премиальных брендов</p>
            </div>
            
            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 bg-secondary">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="sport">Спорт</TabsTrigger>
                <TabsTrigger value="cruiser">Круизер</TabsTrigger>
                <TabsTrigger value="touring">Туринг</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid md:grid-cols-3 gap-6">
              {motorcycles.map((moto) => (
                <Card key={moto.id} className="group bg-card border-border hover:border-primary/50 transition-all duration-300 overflow-hidden">
                  <div className="relative overflow-hidden">
                    {moto.badge && (
                      <Badge className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground">
                        {moto.badge}
                      </Badge>
                    )}
                    <img 
                      src={moto.image} 
                      alt={moto.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <Badge variant="outline" className="mb-2 text-primary border-primary/30">{moto.category}</Badge>
                    <h3 className="text-2xl font-montserrat font-bold mb-2">{moto.name}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <Icon name="Zap" size={16} className="text-primary" />
                      <span>{moto.power}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold text-primary">{moto.price} ₽</div>
                        <div className="text-sm text-muted-foreground">от 25 000 ₽/мес</div>
                      </div>
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <Icon name="ShoppingCart" size={18} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'about' && (
        <section className="py-16 px-4 animate-fade-in" id="about">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">О салоне</Badge>
                <h2 className="text-4xl font-montserrat font-bold mb-6">RollingMoto — ваш путь к мечте</h2>
                <p className="text-muted-foreground text-lg mb-6">
                  Мы работаем на рынке мотоциклов уже более 5 лет. За это время помогли тысячам клиентов найти идеальный мотоцикл и стали одним из крупнейших дилеров в регионе.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/20 p-3 rounded-lg">
                      <Icon name="Award" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Официальный дилер</h3>
                      <p className="text-sm text-muted-foreground">Представляем ведущие мировые бренды</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/20 p-3 rounded-lg">
                      <Icon name="ShieldCheck" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Гарантия качества</h3>
                      <p className="text-sm text-muted-foreground">Все мотоциклы с заводской гарантией</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/20 p-3 rounded-lg">
                      <Icon name="Users" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Профессиональная команда</h3>
                      <p className="text-sm text-muted-foreground">Опытные консультанты и мотомеханики</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Card className="p-6 bg-secondary border-border">
                    <div className="text-3xl font-bold text-primary mb-2">150+</div>
                    <div className="text-sm">Моделей в наличии</div>
                  </Card>
                  <Card className="p-6 bg-secondary border-border">
                    <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-sm">Поддержка клиентов</div>
                  </Card>
                </div>
                <div className="space-y-4 mt-8">
                  <Card className="p-6 bg-secondary border-border">
                    <div className="text-3xl font-bold text-primary mb-2">3000+</div>
                    <div className="text-sm">Довольных клиентов</div>
                  </Card>
                  <Card className="p-6 bg-secondary border-border">
                    <div className="text-3xl font-bold text-primary mb-2">98%</div>
                    <div className="text-sm">Рекомендуют нас</div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'services' && (
        <section className="py-16 px-4 animate-fade-in" id="services">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Услуги</Badge>
              <h2 className="text-4xl font-montserrat font-bold mb-4">Сервисное обслуживание</h2>
              <p className="text-muted-foreground text-lg">Полный спектр услуг для вашего мотоцикла</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {services.map((service, idx) => (
                <Card key={idx} className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 group">
                  <div className="bg-primary/20 w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                    <Icon name={service.icon} className="text-primary" size={32} />
                  </div>
                  <h3 className="font-montserrat font-bold text-xl mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.desc}</p>
                </Card>
              ))}
            </div>
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-transparent border-primary/30">
              <h3 className="text-2xl font-montserrat font-bold mb-6">Что входит в техобслуживание?</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-border">
                  <AccordionTrigger className="hover:text-primary">Базовое ТО (каждые 5000 км)</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Замена масла и фильтров, проверка тормозной системы, регулировка цепи, проверка световых приборов, диагностика электроники.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-border">
                  <AccordionTrigger className="hover:text-primary">Расширенное ТО (каждые 10000 км)</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Включает базовое ТО + замена свечей зажигания, проверка подвески, замена тормозной жидкости, регулировка клапанов.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-border">
                  <AccordionTrigger className="hover:text-primary">Предсезонная подготовка</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Полная диагностика после зимнего хранения, замена технических жидкостей, проверка шин, настройка подвески под ваш стиль езды.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </div>
        </section>
      )}

      {activeSection === 'credit' && (
        <section className="py-16 px-4 animate-fade-in" id="credit">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Кредит и рассрочка</Badge>
              <h2 className="text-4xl font-montserrat font-bold mb-4">Купи мечту уже сегодня</h2>
              <p className="text-muted-foreground text-lg">Выгодные условия кредитования и рассрочки</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-8 bg-card border-border hover:border-primary/50 transition-all">
                <div className="text-primary text-4xl mb-4">0%</div>
                <h3 className="text-2xl font-montserrat font-bold mb-3">Рассрочка</h3>
                <p className="text-muted-foreground mb-6">Беспроцентная рассрочка на 12 месяцев без переплат</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={16} />
                    <span>Первый взнос от 20%</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={16} />
                    <span>Решение за 15 минут</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={16} />
                    <span>Минимум документов</span>
                  </li>
                </ul>
              </Card>
              <Card className="p-8 bg-primary/10 border-primary relative overflow-hidden">
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">Популярно</Badge>
                <div className="text-primary text-4xl mb-4">от 5.9%</div>
                <h3 className="text-2xl font-montserrat font-bold mb-3">Кредит</h3>
                <p className="text-muted-foreground mb-6">Выгодные условия от банков-партнеров</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={16} />
                    <span>Первый взнос от 0%</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={16} />
                    <span>Срок до 5 лет</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={16} />
                    <span>Одобрение в день обращения</span>
                  </li>
                </ul>
              </Card>
              <Card className="p-8 bg-card border-border hover:border-primary/50 transition-all">
                <div className="text-primary text-4xl mb-4">Trade-in</div>
                <h3 className="text-2xl font-montserrat font-bold mb-3">Обмен</h3>
                <p className="text-muted-foreground mb-6">Обменяйте свой старый мотоцикл на новый</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={16} />
                    <span>Оценка за 30 минут</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={16} />
                    <span>Максимальная цена выкупа</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={16} />
                    <span>Помощь с документами</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'promo' && (
        <section className="py-16 px-4 animate-fade-in" id="promo">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Акции</Badge>
              <h2 className="text-4xl font-montserrat font-bold mb-4">Специальные предложения</h2>
              <p className="text-muted-foreground text-lg">Успей воспользоваться выгодными акциями</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="overflow-hidden bg-gradient-to-br from-primary/20 to-transparent border-primary/50">
                <div className="p-8">
                  <Badge className="mb-4 bg-primary text-primary-foreground">До 31 декабря</Badge>
                  <h3 className="text-3xl font-montserrat font-bold mb-4">Скидка до 300 000 ₽</h3>
                  <p className="text-muted-foreground mb-6">На спортивные модели 2024 года. Количество мотоциклов ограничено.</p>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Подробнее
                    <Icon name="ArrowRight" size={18} className="ml-2" />
                  </Button>
                </div>
              </Card>
              <Card className="overflow-hidden bg-gradient-to-br from-secondary to-transparent border-border">
                <div className="p-8">
                  <Badge className="mb-4 bg-muted">Постоянная акция</Badge>
                  <h3 className="text-3xl font-montserrat font-bold mb-4">Бесплатное ТО год</h3>
                  <p className="text-muted-foreground mb-6">При покупке любого мотоцикла — бесплатное обслуживание в течение года.</p>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    Узнать больше
                    <Icon name="ArrowRight" size={18} className="ml-2" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="py-16 px-4 animate-fade-in" id="contacts">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Контакты</Badge>
              <h2 className="text-4xl font-montserrat font-bold mb-4">Приезжайте к нам</h2>
              <p className="text-muted-foreground text-lg">Мы всегда рады помочь вам</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 bg-card border-border">
                <div className="bg-primary/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="MapPin" className="text-primary" size={24} />
                </div>
                <h3 className="font-bold mb-2">Адрес</h3>
                <p className="text-muted-foreground">Москва, ул. Мотоциклистов, 15</p>
              </Card>
              <Card className="p-6 bg-card border-border">
                <div className="bg-primary/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Phone" className="text-primary" size={24} />
                </div>
                <h3 className="font-bold mb-2">Телефон</h3>
                <p className="text-muted-foreground">+7 (495) 123-45-67</p>
              </Card>
              <Card className="p-6 bg-card border-border">
                <div className="bg-primary/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Clock" className="text-primary" size={24} />
                </div>
                <h3 className="font-bold mb-2">Режим работы</h3>
                <p className="text-muted-foreground">Пн-Вс: 10:00 - 21:00</p>
              </Card>
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Bike" className="text-primary" size={24} />
              <span className="font-montserrat font-bold text-xl">RollingMoto</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 RollingMoto. Все права защищены.
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Facebook" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Youtube" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
