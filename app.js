'use strict';
const KEY='fotoakademia2_data',PROG='fotoakademia2_progress';
const localEditor = new URLSearchParams(location.search).get('panel') === 'local';
const scoredQuestions = new WeakSet();
const modules=[{id:'obiektywy',name:'Obiektywy',icon:'📷',description:'Budowa, ogniskowa, jasność, głębia ostrości, AF i stabilizacja.'},{id:'ekspozycja',name:'Ekspozycja',icon:'☀️',description:'Przysłona, czas migawki, ISO, EV i histogram.'},{id:'tryby',name:'Tryby aparatu',icon:'🎛️',description:'M, A/Av, S/Tv, P i kompensacja ekspozycji.'},{id:'swiatlo',name:'Światło',icon:'💡',description:'Charakter światła, kierunek i modyfikatory.'},{id:'kompozycja',name:'Kompozycja',icon:'🖼️',description:'Linie, rytm, perspektywa i świadome kadrowanie.'},{id:'historia',name:'Historia fotografii',icon:'🏛️',description:'Od światła i cienia po dagerotyp, film, kolor i cyfrę.'},{id:'film',name:'Filmowanie',icon:'🎬',description:'FPS, migawka 180°, plany i montaż.'},{id:'techniki',name:'Techniki specjalne',icon:'🔬',description:'HDR, focus stacking i fotografia w podczerwieni.'}];
const historyChapters = [
  {
    "id": "hist-light",
    "date": "Starożytność",
    "icon": "☀️",
    "title": "Fascynacja światłem i cieniem",
    "body": "Zanim powstały aparaty, ludzie obserwowali wędrówkę cienia w ciągu dnia i odbicia w spokojnej wodzie. Cień pozwala rozpoznać kształt, a odbicie pokazuje, że światło może zmienić kierunek. To dobry punkt wyjścia do fotografii: aparat rejestruje światło docierające ze sceny.\n\nNa przełomie V i IV wieku p.n.e. w chińskiej tradycji związanej z Mo Di opisano odwrócony obraz powstający za małym otworem.\n\nZadanie: sfotografuj cień tego samego przedmiotu o dwóch różnych porach dnia. Porównaj jego długość i kierunek.",
    "source": [
      "Smithsonian Learning Lab",
      "https://learninglab.si.edu/resources/view/1005107"
    ]
  },
  {
    "id": "hist-obscura",
    "date": "XI–XVI wiek",
    "icon": "🔦",
    "title": "Camera obscura — obraz w ciemnym pokoju",
    "body": "W XI wieku Ibn al-Hajsam badał, jak światło przechodzi przez małe otwory. W zaciemnionej przestrzeni światło z górnej części sceny trafia poniżej otworu, a światło z dolnej części trafia powyżej. Na przeciwległej powierzchni powstaje odwrócony obraz.\n\nW kolejnych stuleciach camera obscura pomagała obserwatorom i rysownikom. Do niektórych konstrukcji dodano soczewkę, która ułatwiała uzyskanie jasnego, wyraźnego obrazu.\n\nZadanie: zrób niewielki otwór w ściance pudełka. Na przeciwległej ściance umieść kalkę. Skieruj otwór na jasny przedmiot w dobrze oświetlonym miejscu i przyjrzyj się obrazowi na kalce.",
    "diagram": true,
    "source": [
      "Smithsonian — camera obscura",
      "https://www.si.edu/object/camera-obscura:nmah_1184229"
    ]
  },
  {
    "id": "hist-niepce",
    "date": "1826–1827",
    "icon": "🪟",
    "title": "Niépce utrwala widok z okna",
    "body": "Joseph Nicéphore Niépce umieścił w camera obscura cynową płytkę pokrytą światłoczułym bitumem. Długie naświetlanie zmieniało rozpuszczalność bitumu, dzięki czemu po obróbce na płytce pozostał obraz widoku z okna w Le Gras. To najstarsza znana zachowana fotografia wykonana przy użyciu camera obscura.\n\nPrzyjrzyj się zdjęciu: czy potrafisz wskazać dwa dachy i jasny fragment nieba?",
    "photo": [
      "https://upload.wikimedia.org/wikipedia/commons/f/f6/Niepce_1826.jpg",
      "Zarysy dachów i zabudowań widzianych z okna w Le Gras",
      "J.N. Niépce, „Widok z okna w Le Gras”, ok. 1826–1827. Wikimedia Commons, domena publiczna.",
      "https://commons.wikimedia.org/wiki/File:Niepce_1826.jpg"
    ],
    "source": [
      "Harry Ransom Center — heliografia Niépce’a",
      "https://www.hrc.utexas.edu/niepce-heliograph/"
    ]
  },
  {
    "id": "l10",
    "date": "1839",
    "icon": "🖼️",
    "title": "Dagerotyp — obraz na metalowej płytce",
    "body": "W 1839 roku we Francji publicznie przedstawiono metodę Louisa Daguerre’a. Dagerotyp powstawał na posrebrzanej płytce miedzianej. Dawał bardzo szczegółowy, pojedynczy obraz. Każdy portret wymagał własnego naświetlenia.\n\nRobert Cornelius wykonał w tym samym roku autoportret. Przy długim naświetlaniu trzeba było pozostać bez ruchu. Porównaj to z czasem potrzebnym dziś na zrobienie selfie.",
    "photo": [
      "https://tile.loc.gov/storage-services/service/pnp/cph/3g00000/3g05000/3g05000/3g05001v.jpg",
      "Robert Cornelius patrzy w stronę aparatu",
      "Robert Cornelius, autoportret, 1839. Library of Congress.",
      "https://www.loc.gov/resource/cph.3d02174/"
    ],
    "source": [
      "Library of Congress — dagerotypia",
      "https://www.loc.gov/collections/daguerreotypes/articles-and-essays/the-daguerreotype-medium/"
    ]
  },
  {
    "id": "hist-talbot",
    "date": "1841",
    "icon": "🧪",
    "title": "Talbot — jeden negatyw, wiele odbitek",
    "body": "William Henry Fox Talbot opatentował kalotypię. Z papierowego negatywu, na którym jasne i ciemne partie sceny zamieniały się miejscami, można było wykonać wiele pozytywów. W każdej odbitce jasne fragmenty sceny znów były jasne.\n\nPomyśl: co możliwość wykonania wielu odbitek zmieniła w pracy fotografów i w życiu rodzin?",
    "source": [
      "Metropolitan Museum of Art — Talbot",
      "https://www.metmuseum.org/pt/essays/william-henry-fox-talbot-1800-1877-and-the-invention-of-photography"
    ]
  },
  {
    "id": "hist-kodak",
    "date": "1888",
    "icon": "🎞️",
    "title": "Aparat Kodak i fotografia na co dzień",
    "body": "George Eastman wprowadził prosty aparat Kodak z materiałem światłoczułym w rolce. Po zrobieniu zdjęć właściciel mógł odesłać aparat do zakładu, który wywoływał materiał, robił odbitki i ładował nową rolkę. Fotografowanie stało się dostępniejsze dla amatorów.",
    "source": [
      "George Eastman Museum — aparat Kodak z 1888 roku",
      "https://collections.eastman.org/objects/560428/1888-kodak-camera"
    ]
  },
  {
    "id": "hist-color",
    "date": "1907",
    "icon": "🎨",
    "title": "Autochrom — kolor w fotografii",
    "body": "Bracia Auguste i Louis Lumière wprowadzili autochrom. Barwione ziarenka skrobi ziemniaczanej tworzyły mozaikę filtrów przepuszczających różne barwy światła. Gotowe zdjęcie oglądano jako przezrocze. Na zachowanych autochromach tę drobną mozaikę widać pod powiększeniem.",
    "source": [
      "Metropolitan Museum of Art — autochrom z 1907 roku",
      "https://www.metmuseum.org/art/collection/search/285665"
    ]
  },
  {
    "id": "hist-digital",
    "date": "1975 → dziś",
    "icon": "📱",
    "title": "Od aparatu cyfrowego do telefonu",
    "body": "W 1975 roku Steven Sasson zbudował w firmie Kodak prototyp aparatu cyfrowego. Matryca zamieniała padające światło na sygnał, z którego powstawał obraz cyfrowy. W dzisiejszych telefonach oprogramowanie często łączy kilka ujęć, by zachować szczegóły w cieniach i jasnych częściach sceny.\n\nZadanie: porównaj zdjęcia tej samej sceny z trybem nocnym i bez niego. Zobacz, co dzieje się z jasnymi punktami i poruszającymi się przedmiotami.",
    "source": [
      "George Eastman Museum — od dagerotypu do aparatu cyfrowego",
      "https://www.eastman.org/george-eastman-house-camera-book-illustrates-history-photography-daguerreotype-digital"
    ]
  }
];
const defaults={lessons:[
{id:'l1',module:'obiektywy',title:'Budowa obiektywu',body:'Obiektyw tworzy obraz na matrycy lub materiale światłoczułym. Składa się m.in. z układu soczewek, obudowy, mechanizmu ustawiania ostrości oraz przysłony (jeżeli konstrukcja ją zawiera).\n\nOgniskowa i konstrukcja optyczna wpływają na kąt widzenia. Przysłona kontroluje ilość światła wpadającego do aparatu oraz wpływa na głębię ostrości.\n\nZadanie: znajdź na swoim obiektywie oznaczenia ogniskowej, maksymalnego otworu względnego i odległości ostrzenia.'},
{id:'l2',module:'obiektywy',title:'Ogniskowa i kąt widzenia',body:'Dla tego samego formatu matrycy krótsza ogniskowa daje szerszy kąt widzenia, a dłuższa – węższy. Przykładowo na pełnej klatce 24 mm to szeroki kąt, 50 mm jest zbliżone do obiektywu standardowego, a 200 mm to teleobiektyw.\n\nPerspektywa wynika z położenia aparatu względem sceny, a nie z samej ogniskowej. Zmiana ogniskowej z tego samego miejsca zmienia kadr, nie relacje perspektywiczne.\n\nZadanie: sfotografuj tę samą scenę z jednego miejsca przy 24 mm i 70 mm.'},
{id:'l3',module:'obiektywy',title:'Przysłona i głębia ostrości',body:'Liczba przysłony to stosunek ogniskowej do średnicy źrenicy wejściowej. Przy tej samej ogniskowej mniejsza liczba f oznacza większy otwór względny.\n\nPrzy pozostałych warunkach niezmienionych f/1.8 zwykle daje mniejszą głębię ostrości niż f/8. Na głębię ostrości wpływają też odległość ostrzenia, ogniskowa, format obrazu i przyjęte kryterium ostrości.\n\nZadanie: wykonaj portret przy f/2.8 i f/8 z tej samej odległości.'},
{id:'l4',module:'obiektywy',title:'Rodzaje obiektywów',body:'Rybie oko celowo wykorzystuje silne odwzorowanie nieliniowe i często wyraźnie zakrzywia linie proste. Obiektyw szerokokątny obejmuje duży fragment sceny. Teleobiektyw ma wąski kąt widzenia.\n\nZoom pozwala zmieniać ogniskową, a stałoogniskowy ma jedną nominalną ogniskową. Obiektyw makro umożliwia fotografowanie z dużą skalą odwzorowania. Tilt-shift pozwala m.in. kontrolować płaszczyznę ostrości i przesuwać obszar obrazowania.'},
{id:'l5',module:'obiektywy',title:'Autofokus i stabilizacja',body:'AF ustawia ostrość automatycznie, MF – ręcznie. AF-S/One Shot służy zwykle do pojedynczego ustawienia ostrości, AF-C/Servo do ciągłego śledzenia zmian odległości. Nazwy zależą od producenta.\n\nStabilizacja optyczna lub matrycowa pomaga ograniczać poruszenie aparatu, ale nie zatrzymuje ruchu fotografowanego obiektu. Oznaczenia VR, IS, OSS i OIS zależą od marki.'},
{id:'l6',module:'ekspozycja',title:'Trójkąt ekspozycji i EV',body:'Na jasność zarejestrowanego obrazu wpływają przysłona, czas naświetlania i wzmocnienie sygnału ISO. Przysłona i czas określają ilość światła docierającego do matrycy; ISO nie zwiększa ilości światła.\n\nJeden stopień ekspozycji odpowiada dwukrotnej zmianie ilości światła. Przejście z 1/125 s na 1/250 s zmniejsza ekspozycję o jeden stopień przy innych ustawieniach bez zmian.\n\nHistogram pokazuje rozkład jasności pikseli, nie jest bezpośrednim pomiarem poprawności artystycznej ekspozycji.'},
{id:'l7',module:'tryby',title:'M, A/Av, S/Tv i P',body:'M – fotograf wybiera czas i przysłonę. A (Nikon) / Av (Canon) – fotograf wybiera przysłonę, aparat dobiera czas. S (Nikon) / Tv (Canon) – fotograf wybiera czas, aparat dobiera przysłonę. P – aparat proponuje kombinację czasu i przysłony, często z możliwością przesunięcia programu.\n\nAutomatyczne ISO może działać także w trybie M – zależy to od konfiguracji aparatu.'},
{id:'l8',module:'swiatlo',title:'Twarde i miękkie światło',body:'Duże pozorne źródło światła względem fotografowanego obiektu daje zwykle miękkie przejścia cienia. Małe pozorne źródło daje wyraźniejsze, twardsze granice cieni.\n\nSoftbox i dyfuzor mogą zwiększać pozorną wielkość źródła. Blenda odbija światło, a flaga ogranicza jego rozchodzenie.'},
{id:'l9',module:'kompozycja',title:'Linie, rytm i punkt widzenia',body:'Kompozycja organizuje elementy obrazu. Linie prowadzące, rytm, kontrast i równowaga mogą kierować uwagę odbiorcy. Reguła trójpodziału to pomoc, a nie obowiązek.\n\nZadanie: sfotografuj zwyczajny przedmiot z trzech różnych wysokości i wybierz najbardziej interesujący kadr.'},
...historyChapters.map(({ id, title, body }) => ({ id, module: 'historia', title, body })),
{id:'l11',module:'film',title:'FPS i zasada migawki 180°',body:'FPS oznacza liczbę klatek na sekundę. Przy nagrywaniu 25 kl./s zasada migawki 180° odpowiada czasowi około 1/50 s, a przy 50 kl./s – około 1/100 s. To zasada estetyczna dotycząca rozmycia ruchu, nie bezwzględny wymóg.\n\n4K UHD ma rozdzielczość 3840 × 2160 pikseli. Profil Log wymaga właściwego przekształcenia do przestrzeni docelowej, np. Rec.709, i świadomej korekcji barw.'},
{id:'l12',module:'techniki',title:'HDR i focus stacking',body:'Bracketing ekspozycji polega na wykonaniu serii zdjęć z różnymi ekspozycjami. HDR może łączyć te ujęcia, aby zachować szczegóły w światłach i cieniach.\n\nFocus stacking łączy fotografie wykonane przy różnych odległościach ostrzenia, aby uzyskać większy obszar ostrości. Najlepiej sprawdza się przy stabilnej scenie i aparacie.'}
],questions:[
{module:'obiektywy',q:'Co zmienia ogniskowa przy fotografowaniu z tego samego miejsca?',a:['Perspektywę geometryczną','Kąt widzenia i kadr','Czułość ISO','Barwę światła'],correct:1,why:'Perspektywa zależy od położenia aparatu względem sceny.'},
{module:'obiektywy',q:'Które ustawienie daje większy otwór względny?',a:['f/16','f/11','f/8','f/2'],correct:3,why:'Mniejsza liczba f oznacza większy otwór względny.'},
{module:'obiektywy',q:'Który obiektyw umożliwia zmianę ogniskowej?',a:['Zoom','Stałoogniskowy','Filtr ND','Konwerter RAW'],correct:0,why:'Zoom ma regulowaną ogniskową.'},
{module:'obiektywy',q:'Do czego służy funkcja shift w obiektywie tilt-shift?',a:['Do zmiany ISO','Do przesunięcia obszaru obrazowania','Do stabilizacji cyfrowej','Do zmiany balansu bieli'],correct:1,why:'Shift przesuwa układ optyczny względem płaszczyzny obrazowania.'},
{module:'obiektywy',q:'Czy stabilizacja zatrzymuje ruch biegnącego człowieka?',a:['Tak, zawsze','Tylko w RAW','Nie, kompensuje głównie drgania aparatu','Tylko przy f/16'],correct:2,why:'Do zamrożenia ruchu obiektu potrzebny jest odpowiednio krótki czas.'},
{module:'ekspozycja',q:'Zmiana czasu z 1/125 s na 1/250 s oznacza:',a:['Dwa razy więcej światła','Dwa razy mniej światła','Brak zmiany','Zmianę ogniskowej'],correct:1,why:'Skrócenie czasu o połowę zmniejsza ekspozycję o jeden stopień.'},
{module:'ekspozycja',q:'Co przedstawia histogram jasności?',a:['Rozkład jasności pikseli','Odległość ostrzenia','Temperaturę barwową','Liczbę zdjęć'],correct:0,why:'Histogram pokazuje rozkład tonów w obrazie.'},
{module:'tryby',q:'W trybie Av / A fotograf ustawia:',a:['Czas','Przysłonę','Tylko ISO','Rozdzielczość'],correct:1,why:'A/Av to priorytet przysłony.'},
{module:'swiatlo',q:'Co zwykle daje miękkie cienie?',a:['Małe pozorne źródło','Duże pozorne źródło','Krótszy czas','Wyższe ISO'],correct:1,why:'Duże pozorne źródło daje łagodniejsze przejścia cieni.'},
{module:'historia',q:'W którym roku publicznie ogłoszono dagerotypię?',a:['1820','1839','1888','1917'],correct:1,why:'Publiczne ogłoszenie procesu dagerotypii nastąpiło w 1839 roku.'},
{module:'film',q:'Jaki czas odpowiada zasadzie migawki 180° przy 25 kl./s?',a:['1/25 s','1/50 s','1/100 s','1/250 s'],correct:1,why:'Czas to około połowa czasu trwania klatki.'},
{module:'techniki',q:'Focus stacking polega na:',a:['Łączeniu różnych płaszczyzn ostrości','Zwiększaniu ISO','Zmianie balansu bieli','Zapisie tylko JPEG'],correct:0,why:'Łączy zdjęcia ostrzone na różne odległości.'}
],contests:[{title:'Sztuka jest w codzienności',date:'2026-12-11',description:'Pokaż zwykły przedmiot w niecodzienny, artystyczny sposób. Zadbaj o światło, perspektywę i kadr.',status:'Przykładowe wyzwanie – bez przesyłania prac'},{title:'Światłem malowane',date:'2027-01-31',description:'Przykładowe ogłoszenie konkursowe. Nauczyciel powinien uzupełnić termin i regulamin zgodnie z oficjalnymi informacjami.',status:'Przykładowe wyzwanie'}]};
let data=withHistoryLessons(read(KEY,defaults)),progress=read(PROG,{done:[],points:0,badges:[]}),tab='start',selectedModule='obiektywy',quizIndex=0,quizAnswer=null,sim={focal:50,aperture:2.8,shutter:125,iso:100};
function withHistoryLessons(content) {
  if (!Array.isArray(content.lessons)) return structuredClone(defaults);
  const legacyTitle = 'Od camera obscura do dagerotypu';
  const byId = new Map(content.lessons.map(lesson => [lesson.id, lesson]));
  const chapters = historyChapters.map(({id, title, body}) => {
    const saved = byId.get(id);
    return saved && !(id === 'l10' && saved.title === legacyTitle)
      ? saved
      : { id, module: 'historia', title, body };
  });
  const historyIds = new Set(chapters.map(lesson => lesson.id));
  return { ...content, lessons: [...content.lessons.filter(lesson => !historyIds.has(lesson.id)), ...chapters] };
}

function historyTimeline() {
  return `<nav class="history-timeline" aria-label="Oś czasu historii fotografii">
    <h3>Od światła do fotografii cyfrowej</h3>
    <ol>${historyChapters.map(chapter => `<li><a href="#history-${chapter.id}">
      <span aria-hidden="true">${chapter.icon}</span>
      <strong>${chapter.date}</strong><small>${chapter.title}</small>
    </a></li>`).join('')}</ol>
  </nav>`;
}

function lessonCard(lesson, chapter) {
  const done = progress.done.includes(lesson.id);
  const photo = chapter?.photo;
  const illustration = photo ? `<figure class="history-figure">
    <img src="${photo[0]}" alt="${photo[1]}" loading="lazy" referrerpolicy="no-referrer">
    <figcaption><a href="${photo[3]}">${photo[2]}</a></figcaption>
  </figure>` : chapter?.diagram ? `<figure class="history-figure">
    <div class="obscura-diagram" aria-hidden="true">
      <span>↑</span><i></i><span>↓</span>
    </div>
    <figcaption>Schemat camera obscura. Promienie krzyżują się w otworze, a obraz na ekranie jest odwrócony.</figcaption>
  </figure>` : '';
  return `<article class="card"${chapter ? ` id="history-${chapter.id}"` : ''}>
    ${chapter ? `<div class="history-date"><span aria-hidden="true">${chapter.icon}</span> ${chapter.date}</div>` : ''}
    <div class="row" style="justify-content:space-between"><h3>${esc(lesson.title)}</h3>
    <span class="tag">${done ? '✓ Ukończono' : 'Do poznania'}</span></div>
    ${illustration}
    <div class="lesson">${esc(lesson.body)}</div>
    ${chapter?.source ? `<p><a href="${chapter.source[1]}">${chapter.source[0]}</a></p>` : ''}
    <p><button class="btn alt" data-complete="${esc(lesson.id)}">${done ? 'Oznacz jako nieukończoną' : 'Oznacz jako ukończoną'}</button></p>
  </article>`;
}

function moduleLessons() {
  const lessons = data.lessons.filter(lesson => lesson.module === selectedModule);
  if (selectedModule !== 'historia') return lessons.map(lesson => lessonCard(lesson)).join('');
  const byId = new Map(lessons.map(lesson => [lesson.id, lesson]));
  const chapters = historyChapters.map(chapter => {
    const lesson = byId.get(chapter.id);
    byId.delete(chapter.id);
    return lesson ? lessonCard(lesson, chapter) : '';
  });
  return [...chapters, ...Array.from(byId.values(), lesson => lessonCard(lesson))].join('');
}

function read(k,d){try{let v=JSON.parse(localStorage.getItem(k));return v&&typeof v==='object'?v:structuredClone(d)}catch{return structuredClone(d)}}function save(){localStorage.setItem(KEY,JSON.stringify(data));localStorage.setItem(PROG,JSON.stringify(progress))}function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}function html(s){return document.getElementById('app').innerHTML=s}function btn(t,label){return `<button class="${tab===t?'active':''}" data-tab="${t}">${label}</button>`}function card(m){let count=data.lessons.filter(l=>l.module===m.id).length;return `<article class="card"><div class="emoji">${m.icon}</div><h3>${esc(m.name)}</h3><p>${esc(m.description)}</p><span class="tag">${count} ${count===1?'lekcja':'lekcji'}</span><p><button class="btn alt" data-module="${m.id}">Otwórz dział →</button></p></article>`}function layout(content){html(`<main class="shell"><header class="top"><div class="brand"><span class="logo">📷</span><span>Foto<span style="color:#b69aff">Akademia</span><div class="muted small">Twoja szkoła fotografii</div></span></div>${localEditor ? '<span class="pill">Edycja lokalna</span>' : ''}</header><nav class="nav">${btn('start','⌂ Start')}${btn('lekcje','📚 Lekcje')}${btn('symulator','🎛️ Laboratorium')}${btn('quiz','🧠 Quizy')}${btn('konkursy','🏆 Konkursy')}${localEditor ? btn('panel','⚙️ Panel') : ''}</nav>${content}<footer class="footer">FotoAkademia · Postępy i punkty zapisują się w tej przeglądarce.<br><small>Autor aplikacji: Paweł Fąferek</small></footer></main>`)}function show(t=tab){if(t==='panel'&&!localEditor)t='start';tab=t;let content='';if(t==='start'){content=`<section class="hero"><div><span class="tag">FOTOGRAFIA • NAUKA • ZABAWA</span><h1>Odkrywaj świat<br><span style="color:#b89cff">fotografii.</span></h1><p>Ucz się przez doświadczenie. Poznawaj sprzęt, eksperymentuj z ustawieniami i sprawdzaj swoją wiedzę.</p><button class="btn" data-tab="lekcje">Rozpocznij naukę →</button></div><div class="hero-art">📸</div></section><section class="stats"><div class="stat"><strong>${data.lessons.length}</strong><span class="muted small">lekcji</span></div><div class="stat"><strong>${progress.points}</strong><span class="muted small">punktów lokalnie</span></div><div class="stat"><strong>${progress.done.length}</strong><span class="muted small">ukończonych</span></div></section><div class="heading"><h2>Poznaj moduły</h2></div><div class="grid">${modules.map(card).join('')}</div>`}else if(t==='lekcje'){let m=modules.find(x=>x.id===selectedModule);content=`<div class="heading"><h2>📚 Lekcje fotograficzne</h2></div><div class="row" style="margin-bottom:15px"><select id="moduleSelect" style="padding:12px;background:#262339;color:white;border-radius:10px;border:1px solid #504966">${modules.map(x=>`<option value="${x.id}" ${x.id===selectedModule?'selected':''}>${x.name}</option>`).join('')}</select></div><p class="muted">${esc(m.description)}</p>${selectedModule==='historia' ? historyTimeline() : ''}<div class="list">${moduleLessons()||'<p class="notice">Ten dział jest gotowy do uzupełnienia przez nauczyciela.</p>'}</div>`}else if(t==='symulator'){let ev=exposureDifference();content=`<div class="heading"><h2>🎛️ Laboratorium aparatu</h2></div><p class="muted">Uproszczona ilustracja zależności fotograficznych. Symulacja nie odwzorowuje fizycznie wszystkich właściwości obiektywu i matrycy.</p><div class="sim-layout"><div class="scene"><div class="sun"></div><div class="foreground"></div><div class="subject" id="subject" style="transform:scale(${Math.min(2.1,Math.max(.55,sim.focal/55))});filter:blur(${Math.max(0,3.2-sim.aperture/3)}px) drop-shadow(0 10px 7px #0008);opacity:${Math.min(1,Math.max(.3,1-ev*.08))}">📷</div></div><div class="card"><h3>Ustawienia aparatu</h3>${slider('focal','Ogniskowa',14,200,1,'mm')}${slider('aperture','Przysłona',1.4,22,.2,'f/')}${slider('shutter','Mianownik czasu 1/',25,2000,25,'')}${slider('iso','ISO',100,3200,100,'')}<p class="notice">Wskaźnik zmian względem f/2.8, 1/125 s, ISO 100: <strong id="ev-value">${(-ev).toFixed(1)} stopnia</strong> jasności obrazu (orientacyjnie).</p><p class="muted small">Ogniskowa zmienia wielkość obiektu w kadrze z tego samego punktu. Efekt rozmycia jest wyłącznie poglądowy.</p></div></div>`}else if(t==='quiz'){let pool=data.questions.filter(q=>q.module===selectedModule);let q=pool[quizIndex%Math.max(1,pool.length)];content=`<div class="heading"><h2>🧠 Quiz wiedzy</h2></div><div class="row" style="margin-bottom:15px"><select id="moduleSelect" style="padding:12px;background:#262339;color:white;border-radius:10px;border:1px solid #504966">${modules.map(x=>`<option value="${x.id}" ${x.id===selectedModule?'selected':''}>${x.name}</option>`).join('')}</select><span class="pill">Punkty: ${progress.points}</span></div>${q?`<div class="card"><span class="tag">Pytanie ${quizIndex%pool.length+1} z ${pool.length}</span><h2>${esc(q.q)}</h2>${q.a.map((a,i)=>`<button class="quiz-option${quizAnswer === null ? '' : i === q.correct ? ' correct' : i === quizAnswer ? ' wrong' : ''}" data-answer="${i}" ${quizAnswer === null ? '' : 'disabled'}>${String.fromCharCode(65+i)}. ${esc(a)}</button>`).join('')}${quizAnswer === null ? '' : `<p class="notice" id="feedback">${quizAnswer === q.correct ? '✅ Dobrze!' : '❌ Nie tym razem.'} ${esc(q.why)}</p><button class="btn alt" id="nextQuiz">Następne pytanie →</button>`}</div>`:'<div class="notice">W tym dziale nie ma jeszcze pytań.</div>'}<p class="muted small">Za poprawną odpowiedź możesz dostać 10 punktów raz na pytanie w czasie jednego otwarcia aplikacji. Punkty zapisują się w tej przeglądarce.</p>`}else if(t==='konkursy'){content=`<div class="heading"><h2>🏆 Konkursy i wyzwania</h2></div><p class="notice">Tutaj znajdziesz opisy wyzwań fotograficznych. Informacji o zgłoszeniach szukaj w ogłoszeniu organizatora.</p><div class="grid">${data.contests.map(c=>`<div class="card"><div class="emoji">🏅</div><span class="tag">${esc(c.status||'Wyzwanie')}</span><h3>${esc(c.title)}</h3><p>${esc(c.description)}</p><p>📅 ${esc(c.date||'Termin do ustalenia')}</p></div>`).join('')}</div>`}else if(t==='panel'){content=`<div class="heading"><h2>⚙️ Panel tworzenia treści</h2></div><div class="notice"><strong>Edycja lokalna.</strong> Zmiany zapisują się w tej przeglądarce. Panel służy do przygotowywania materiałów i tworzenia kopii JSON. Nie umieszczaj w nim danych osobowych uczniów.</div><div class="grid"><section class="card"><h3>➕ Dodaj lekcję</h3><form class="form" id="lessonForm"><label>Dział<select name="module">${modules.map(m=>`<option value="${m.id}">${m.name}</option>`).join('')}</select></label><label>Tytuł<input name="title" required maxlength="140" placeholder="Tytuł lekcji"></label><label>Treść<textarea name="body" required placeholder="Wpisz materiał edukacyjny…"></textarea></label><button class="btn">Zapisz lekcję</button></form></section><section class="card"><h3>➕ Dodaj pytanie</h3><form class="form" id="questionForm"><label>Dział<select name="module">${modules.map(m=>`<option value="${m.id}">${m.name}</option>`).join('')}</select></label><label>Pytanie<input name="q" required maxlength="250"></label>${[0,1,2,3].map(i=>`<label>Odpowiedź ${'ABCD'[i]}<input name="a${i}" required maxlength="250"></label>`).join('')}<label>Poprawna odpowiedź<select name="correct">${[0,1,2,3].map(i=>`<option value="${i}">${'ABCD'[i]}</option>`).join('')}</select></label><label>Wyjaśnienie<input name="why" required></label><button class="btn">Zapisz pytanie</button></form></section><section class="card"><h3>➕ Dodaj konkurs</h3><form class="form" id="contestForm"><label>Nazwa<input name="title" required></label><label>Termin<input name="date" type="date"></label><label>Opis<textarea name="description" required></textarea></label><button class="btn">Zapisz konkurs</button></form></section></div><div class="heading"><h2>Twoje materiały i kopia zapasowa</h2></div><div class="card"><p>Eksport pozwala przenieść materiały do pliku JSON. Import zastępuje obecne materiały zawartością pliku. Plik JSON może być użyty później do przygotowania kolejnej opublikowanej wersji.</p><div class="row"><button class="btn" id="export">Pobierz kopię JSON</button><label class="btn alt">Wczytaj kopię JSON <input id="import" type="file" accept="application/json,.json" style="display:none"></label><button class="btn warn" id="reset">Przywróć treści przykładowe</button></div><p class="muted small">Lekcje: ${data.lessons.length} · pytania: ${data.questions.length} · konkursy: ${data.contests.length}</p></div><div class="heading"><h2>Usuń własne wpisy</h2></div><div class="list">${data.lessons.filter(l=>!defaults.lessons.some(x=>x.id===l.id)).map(l=>`<div class="list-item">📚 ${esc(l.title)} <button class="btn alt" data-delete="lesson:${esc(l.id)}">Usuń</button></div>`).join('')}${data.contests.map((c,i)=>`<div class="list-item">🏆 ${esc(c.title)} <button class="btn alt" data-delete="contest:${i}">Usuń</button></div>`).join('')}</div>`}layout(content);bind()}
function exposureDifference() {
  return Math.log2((sim.aperture**2/sim.shutter)/(2.8**2/125))-Math.log2(sim.iso/100);
}
function slider(key,name,min,max,step,unit){let value=sim[key],display=key==='aperture'?'f/'+value:key==='shutter'?'1/'+value+' s':value+(unit==='mm'?' mm':'');return `<div class="slider-row"><label for="sim-${key}">${name}<strong id="val-${key}">${display}</strong></label><input id="sim-${key}" data-slider="${key}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></div>`}
function bind(){document.querySelectorAll('[data-tab]').forEach(x=>x.onclick=()=>show(x.dataset.tab));document.querySelectorAll('[data-module]').forEach(x=>x.onclick=()=>{selectedModule=x.dataset.module;quizIndex=0;quizAnswer=null;show('lekcje')});document.querySelector('#moduleSelect')?.addEventListener('change',e=>{selectedModule=e.target.value;quizIndex=0;quizAnswer=null;show()});document.querySelectorAll('[data-complete]').forEach(x=>x.onclick=()=>{let id=x.dataset.complete;progress.done=progress.done.includes(id)?progress.done.filter(z=>z!==id):[...progress.done,id];save();show()});document.querySelectorAll('[data-slider]').forEach(input => {
    input.oninput = () => {
      const key = input.dataset.slider;
      sim[key] = Number(input.value);
      const value = sim[key];
      document.getElementById('val-' + key).textContent = key === 'aperture' ? 'f/' + value : key === 'shutter' ? '1/' + value + ' s' : key === 'focal' ? value + ' mm' : value;
      const subject = document.getElementById('subject');
      const ev = exposureDifference();
      subject.style.transform = 'scale(' + Math.min(2.1, Math.max(.55, sim.focal / 55)) + ')';
      subject.style.filter = 'blur(' + Math.max(0, 3.2 - sim.aperture / 3) + 'px) drop-shadow(0 10px 7px #0008)';
      subject.style.opacity = Math.min(1, Math.max(.3, 1 - ev * .08));
      document.getElementById('ev-value').textContent = (-ev).toFixed(1) + ' stopnia';
    };
  });document.querySelectorAll('[data-answer]').forEach(button => {
    button.onclick = () => {
      if (quizAnswer !== null) return;
      const pool = data.questions.filter(question => question.module === selectedModule);
      const question = pool[quizIndex % pool.length];
      quizAnswer = Number(button.dataset.answer);
      if (quizAnswer === question.correct && !scoredQuestions.has(question)) {
        scoredQuestions.add(question);
        progress.points += 10;
        save();
      }
      show('quiz');
      document.getElementById('nextQuiz')?.focus();
    };
  });
  document.getElementById('nextQuiz')?.addEventListener('click', () => {
    quizIndex++;
    quizAnswer = null;
    show('quiz');
    document.querySelector('[data-answer]')?.focus();
  });
  ['lesson','question','contest'].forEach(type=>document.getElementById(type+'Form')?.addEventListener('submit',e=>{e.preventDefault();let f=new FormData(e.target);if(type==='lesson')data.lessons.push({id:'custom_'+Date.now(),module:f.get('module'),title:f.get('title').trim(),body:f.get('body').trim()});if(type==='question')data.questions.push({module:f.get('module'),q:f.get('q').trim(),a:[0,1,2,3].map(i=>f.get('a'+i).trim()),correct:Number(f.get('correct')),why:f.get('why').trim()});if(type==='contest')data.contests.push({title:f.get('title').trim(),date:f.get('date'),description:f.get('description').trim(),status:'Ogłoszenie lokalne'});save();alert('Zapisano na tym urządzeniu. Aby udostępnić treść innym, potrzebna będzie publikacja nowej wersji lub przyszła baza danych.');show('panel')}));document.getElementById('export')?.addEventListener('click',()=>{let blob=new Blob([JSON.stringify({version:2,data,progress},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='fotoakademia-kopia.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});document.getElementById('import')?.addEventListener('change',async e=>{let file=e.target.files[0];if(!file)return;try{let obj=JSON.parse(await file.text());if(!obj.data||!Array.isArray(obj.data.lessons)||!Array.isArray(obj.data.questions)||!Array.isArray(obj.data.contests)||obj.data.lessons.length>2000||obj.data.questions.length>5000||obj.data.contests.length>1000)throw Error('Nieprawidłowy format');data=withHistoryLessons(obj.data);save();show('panel');alert('Wczytano kopię materiałów')}catch{alert('Nie można wczytać pliku. Sprawdź format kopii FotoAkademii.')}});document.getElementById('reset')?.addEventListener('click',()=>{if(confirm('Przywrócić materiały przykładowe? Własne wpisy znikną z tego urządzenia.')){data=structuredClone(defaults);save();show('panel')}});document.querySelectorAll('[data-delete]').forEach(x=>x.onclick=()=>{let [kind,id]=x.dataset.delete.split(':');if(!confirm('Usunąć wpis?'))return;if(kind==='lesson')data.lessons=data.lessons.filter(l=>l.id!==id);if(kind==='contest')data.contests.splice(Number(id),1);save();show('panel')})}show();if('serviceWorker'in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('./sw.js').catch(()=>{});

async function pobierzLekcjeSupabase() {
  const config = window.FOTO_SUPABASE;
  if (!config?.url || !config?.publishableKey) {
    console.warn('Brak konfiguracji Supabase');
    return;
  }

  const headers = {
    apikey: config.publishableKey
  };

  try {
    const [lekcjeRes, modulyRes] = await Promise.all([
      fetch(`${config.url}/rest/v1/fa_lessons?published=eq.true&select=id,module_id,title,body,sort_order&order=sort_order.asc`, { headers }),
      fetch(`${config.url}/rest/v1/fa_modules?select=*`, { headers })
    ]);

    if (!lekcjeRes.ok || !modulyRes.ok) {
      throw new Error(
        `Błąd odczytu: lekcje ${lekcjeRes.status}, moduły ${modulyRes.status}`
      );
    }

    const lekcje = await lekcjeRes.json();
    const moduly = await modulyRes.json();

    const identyfikatory = new Map(
      moduly.map(m => [
        String(m.id),
        String(m.slug || m.name || m.title || '').toLowerCase()
      ])
    );

    const noweLekcje = lekcje.map(l => {
      const nazwa = identyfikatory.get(String(l.module_id)) || '';
      const modul = modules.find(m =>
        m.id === nazwa ||
        m.name.toLowerCase() === nazwa
      );

      return {
        id: `supabase_${l.id}`,
        module: modul?.id || 'obiektywy',
        title: l.title,
        body: l.body
      };
    });

    data.lessons = [
      ...data.lessons.filter(l => !String(l.id).startsWith('supabase_')),
      ...noweLekcje
    ];

    show();
    console.info(`Supabase: pobrano ${noweLekcje.length} lekcji.`);
  } catch (error) {
    console.error('Nie udało się pobrać lekcji z Supabase:', error);
  }
}

pobierzLekcjeSupabase();
