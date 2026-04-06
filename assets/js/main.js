/* Services section animation removed — section redesigned */
(function () {
  'use strict';
  // Animate primary service rows on scroll
  var rows = document.querySelectorAll('.srv-primary-row, .srv-secondary-row');
  if (!rows.length || typeof IntersectionObserver === 'undefined') return;
  rows.forEach(function(r) {
    r.style.opacity = '0';
    r.style.transform = 'translateY(16px)';
    r.style.transition = 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.22,0.8,0.32,1)';
  });
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  rows.forEach(function(r, i) {
    setTimeout(function() { observer.observe(r); }, i * 40);
  });
})();

(function(){
  var header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', function(){
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  var btn = document.getElementById('nav-toggle');
  var nav = document.getElementById('mobile-nav');
  var ham = document.getElementById('hamburger-icon');
  var cls = document.getElementById('close-icon');
  var body = document.body;
  var mobileGroups = document.querySelectorAll('.mobile-nav-group');
  var desktopDropdownToggle = document.querySelector('.nav-item-has-children > .nav-link');

  function setMobileMenu(open) {
    if (!btn || !nav || !ham || !cls) return;
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    ham.style.display = open ? 'none' : '';
    cls.style.display = open ? '' : 'none';
    body.classList.toggle('nav-open', open && window.innerWidth <= 760);
  }

  if (btn && nav && ham && cls) {
    btn.addEventListener('click', function(){
      setMobileMenu(!nav.classList.contains('open'));
    });

    nav.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        setMobileMenu(false);
      });
    });

    window.addEventListener('resize', function(){
      if (window.innerWidth > 760) {
        setMobileMenu(false);
      }
    });

    document.addEventListener('click', function(event) {
      if (!nav.classList.contains('open')) return;
      if (nav.contains(event.target) || btn.contains(event.target)) return;
      setMobileMenu(false);
    });

    document.addEventListener('keydown', function(event){
      if (event.key === 'Escape') {
        setMobileMenu(false);
        if (desktopDropdownToggle) {
          desktopDropdownToggle.setAttribute('aria-expanded', 'false');
          desktopDropdownToggle.blur();
        }
      }
    });
  }

  if (desktopDropdownToggle) {
    var navItem = desktopDropdownToggle.parentElement;
    desktopDropdownToggle.addEventListener('focus', function(){
      desktopDropdownToggle.setAttribute('aria-expanded', 'true');
    });
    if (navItem) {
      navItem.addEventListener('mouseleave', function(){
        desktopDropdownToggle.setAttribute('aria-expanded', 'false');
      });
      navItem.addEventListener('focusout', function(event){
        if (!navItem.contains(event.relatedTarget)) {
          desktopDropdownToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  mobileGroups.forEach(function(group){
    var toggle = group.querySelector('.mobile-nav-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function(){
      var willOpen = !group.classList.contains('open');
      mobileGroups.forEach(function(other){
        if (other !== group) {
          other.classList.remove('open');
          var otherToggle = other.querySelector('.mobile-nav-toggle');
          if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
        }
      });
      group.classList.toggle('open', willOpen);
      toggle.setAttribute('aria-expanded', String(willOpen));
    });
  });

  var sectionMap = ['services', 'why', 'faq-preview', 'final-cta'];
  var navLinks = document.querySelectorAll('[data-nav-target]');

  function setActiveNav(targetId) {
    navLinks.forEach(function(link){
      var active = link.getAttribute('data-nav-target') === targetId;
      link.classList.toggle('active', active);
    });
    if (desktopDropdownToggle) {
      desktopDropdownToggle.classList.toggle('active', targetId === 'services');
    }
  }

  if ('IntersectionObserver' in window) {
    var sections = sectionMap
      .map(function(id){ return document.getElementById(id); })
      .filter(Boolean);

    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          setActiveNav(entry.target.id);
        }
      });
    }, {
      rootMargin: '-30% 0px -55% 0px',
      threshold: 0.01
    });

    sections.forEach(function(section){
      observer.observe(section);
    });
  }


  /* ── FAQ accordion ── */
  var items = document.querySelectorAll('.faq-item');
  if (items.length) {
    items.forEach(function(item, index){
      var button = item.querySelector('.faq-question');
      var answer = item.querySelector('.faq-answer');
      if (!button || !answer) return;

      if (!answer.id) {
        answer.id = 'faq-panel-' + (index + 1);
      }
      button.setAttribute('aria-controls', answer.id);
      answer.setAttribute('aria-hidden', 'true');

      button.addEventListener('click', function(){
        var isOpen = item.classList.contains('open');

        items.forEach(function(other){
          var otherBtn = other.querySelector('.faq-question');
          var otherAns = other.querySelector('.faq-answer');
          other.classList.remove('open');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAns) {
            otherAns.style.maxHeight = null;
            otherAns.setAttribute('aria-hidden', 'true');
          }
        });

        if (!isOpen) {
          item.classList.add('open');
          button.setAttribute('aria-expanded', 'true');
          answer.setAttribute('aria-hidden', 'false');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });

    window.addEventListener('resize', function(){
      var openItem = document.querySelector('.faq-item.open .faq-answer');
      if (openItem) {
        openItem.style.maxHeight = openItem.scrollHeight + 'px';
      }
    });
  }
})();

(function () {
  var items = document.querySelectorAll('.reveal-on-scroll');
  if (!items.length) return;

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(function (item) { item.classList.add('is-visible'); });
    return;
  }

  if (!('IntersectionObserver' in window)) {
    items.forEach(function (item) { item.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -10% 0px'
  });

  items.forEach(function (item) {
    observer.observe(item);
  });
})();

(function () {
  var servicesHeader = document.querySelector('.services-list-header');
  if (!servicesHeader) return;

  function revealTreeArt() {
    if (servicesHeader.classList.contains('art-in-view')) return;

    servicesHeader.classList.remove('art-in-view');
    void servicesHeader.offsetWidth;
    servicesHeader.classList.add('art-in-view');
  }

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealTreeArt();
    return;
  }

  if (!('IntersectionObserver' in window)) {
    revealTreeArt();
    return;
  }

  var artObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      revealTreeArt();
      artObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.22,
    rootMargin: '0px 0px -8% 0px'
  });

  artObserver.observe(servicesHeader);
})();

(function () {
  const form = document.getElementById('quick-contact-form');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString().trim();
    const phone = (formData.get('phone') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const service = (formData.get('service') || '').toString().trim();
    const details = (formData.get('details') || '').toString().trim();

    if (!name || !phone || !email || !service || !details) {
      form.reportValidity();
      return;
    }

    const subject = encodeURIComponent('Estimate Request — Arborize Ltd.');
    const body = encodeURIComponent(
      'Name: ' + name + '\n' +
      'Phone: ' + phone + '\n' +
      'Email: ' + email + '\n' +
      'Service Needed: ' + service + '\n\n' +
      'Project Details:\n' + details
    );

    window.location.href = 'mailto:arborizeltd@outlook.com?subject=' + subject + '&body=' + body;
  });
})();
