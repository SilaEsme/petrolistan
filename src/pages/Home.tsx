import React from 'react';
import { colors } from '../design-system/tokens/colors';
import { Button } from '../design-system/components/Button/Button';
import { Text } from '../design-system/components/Typography/Text';
import { Container } from '../design-system/components/Layout/Container';
import { Card } from '../design-system/components/Surface/Card';
import { AdSpace } from '../design-system/components/Layout/AdSpace'; // Yeni bileşeni ekledik

// Navbar aynı kalıyor
const Navbar = () => (
  <nav style={{ 
    backgroundColor: colors.secondary.main, 
    padding: '16px 0', 
    position: 'sticky', 
    top: 0, 
    zIndex: 100,
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
  }}>
    <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text variant="xl" weight="bold" color={colors.primary.main}>
        PETROLISTAN
      </Text>
      <div style={{ display: 'flex', gap: '20px' }}>
        {['Kurumsal', 'Hizmetler', 'İletişim'].map((item) => (
          <Button key={item} variant="secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
            {item}
          </Button>
        ))}
      </div>
    </Container>
  </nav>
);

export const Home = () => {
  return (
    <div style={{ backgroundColor: colors.background.default, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <Navbar />

      {/* --- ANA LAYOUT CONTAINER (3 Sütunlu Yapı) --- */}
      {/* maxWidth: '100%' yaparak tüm ekranı kaplamasını sağlıyoruz, ama ortalıyoruz */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        padding: '20px', 
        flex: 1 
      }}>
        
        {/* 1. SOL REKLAM */}
        <div className="desktop-only">
           <AdSpace position="left" />
        </div>

        {/* 2. ORTA İÇERİK (Ana sayfa içeriği buraya taşındı) */}
        {/* flex: 1 diyerek ortadaki alanın kalan tüm boşluğu doldurmasını sağlıyoruz */}
        <div style={{ flex: 1, maxWidth: '1200px', width: '100%' }}>
            
            {/* HERO SECTION (Artık orta sütunun içinde) */}
            <section style={{ 
              backgroundColor: colors.secondary.dark, 
              padding: '80px 40px', 
              textAlign: 'center',
              borderRadius: '16px', // Köşeleri yumuşattık çünkü artık tam ekran değil
              marginBottom: '40px',
              position: 'relative',
              overflow: 'hidden'
            }}>
               {/* Dekoratif Arkaplan Efekti */}
               <div style={{
                 position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
                 background: `radial-gradient(circle, ${colors.primary.main}20 0%, transparent 70%)`,
                 zIndex: 0
               }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <Text as="h1" variant="h1" weight="bold" color={colors.secondary.contrastText}>
                  Geleceğin Enerjisi
                </Text>
                <Text variant="lg" color={colors.secondary.light} style={{ margin: '20px 0' }}>
                  Sektördeki en yenilikçi çözümler ve sürdürülebilir enerji kaynakları.
                </Text>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                  <Button variant="primary">Teklif Al</Button>
                </div>
              </div>
            </section>

            {/* KARTLAR */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              <Card>
                <Text weight="bold" color={colors.primary.dark}>%100 Yerli</Text>
                <Text variant="sm">Üretimden dağıtıma tam bağımsızlık.</Text>
              </Card>
              <Card>
                <Text weight="bold" color={colors.primary.dark}>7/24 Destek</Text>
                <Text variant="sm">Kesintisiz operasyonel süreç yönetimi.</Text>
              </Card>
              <Card>
                <Text weight="bold" color={colors.primary.dark}>Eko-Lojistik</Text>
                <Text variant="sm">Düşük karbon ayak izi ile nakliye.</Text>
              </Card>
            </div>

            {/* İÇERİK BÖLÜMÜ */}
            <div style={{ marginTop: '40px' }}>
              <Card style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                 <div style={{ flex: 1 }}>
                    <Text variant="xl" weight="bold">Haber Bülteni</Text>
                    <Text>Sektördeki son gelişmelerden haberdar olmak için kaydolun.</Text>
                 </div>
                 <Button variant="outline">Kayıt Ol</Button>
              </Card>
            </div>

        </div>

        {/* 3. SAĞ REKLAM */}
        <div className="desktop-only">
          <AdSpace position="right" />
        </div>

      </div>
    </div>
  );
};