import re

def create_page(filename, title, content_html):
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Extract header up to the end of the hero section or <nav>
    # Actually, let's extract everything up to </header>
    header_match = re.search(r'(.*?</header>)', html, re.DOTALL)
    header = header_match.group(1) if header_match else ''
    
    # Extract everything from <footer> to end
    footer_match = re.search(r'(<footer.*)', html, re.DOTALL)
    footer = footer_match.group(1) if footer_match else ''
    
    # We also need to change the <title>
    header = re.sub(r'<title>.*?</title>', f'<title>{title} - Nha Khoa Tâm Smile</title>', header)
    
    # Hero section for the service
    hero = f'''
  <section class="hero" style="min-height: 40vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.8)), url('hero_dental.jpg') center/cover;">
    <div class="container text-center reveal">
      <h1 class="hero-title">{title}</h1>
      <p class="hero-desc">Khám phá gi?i pháp nha khoa hi?n d?i, an toàn và chuyên nghi?p t?i Tâm Smile.</p>
    </div>
  </section>
  <section class="py-5">
    <div class="container">
      {content_html}
      
      <div style="text-align: center; margin-top: 3rem;">
        <a href="#booking" class="btn-primary" onclick="document.getElementById('bookingModal').classList.add('active')">Ð?t l?ch ngay</a>
        <a href="index.html" class="btn-outline" style="margin-left: 1rem;">V? trang ch?</a>
      </div>
    </div>
  </section>
'''
    
    # Assemble
    full_html = header + hero + footer
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(full_html)
    print(f"Created {filename}")

pages = [
    ('service-implant.html', 'C?y Ghép Implant'),
    ('service-caovoirang.html', 'C?o Vôi Rang An Toàn - Chu?n Y Khoa'),
    ('service-taytrangrang.html', 'T?y Tr?ng Rang'),
    ('service-veneer.html', 'M?t Dán S? Veneer'),
    ('service-tongquat.html', 'Ði?u Tr? T?ng Quát'),
    ('service-treem.html', 'Nha Khoa Tr? Em')
]

for p in pages:
    # Basic placeholder content, will be overwritten by multi_replace
    create_page(p[0], p[1], f"<h2>Chi ti?t d?ch v? {p[1]}</h2><p>N?i dung chi ti?t dang du?c c?p nh?t...</p>")
