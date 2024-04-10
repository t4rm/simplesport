import { Component, ElementRef } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-landing-animation',
  templateUrl: './landing.component.html',
  standalone: true,
})
export class LandingAnimationComponent {
  q: gsap.utils.SelectorFunc
  tl: gsap.core.Timeline

  constructor(private el: ElementRef) {
    this.q = gsap.utils.selector(el);
    this.tl = gsap.timeline({ q: this.q });
    setTimeout(() => this.revealText(), 0);
  }

  revealText() {
    this.q('span').forEach((element, index) => {
      this.tl.from(element, {
        duration: 0.5,
        opacity: 0,
        x: gsap.utils.random(-50, 50),
        y: gsap.utils.random(-50, 50),
        z: gsap.utils.random(-50, 50),
        rotationX: gsap.utils.random(-360, 360),
        rotationY: gsap.utils.random(-360, 360),
        rotationZ: gsap.utils.random(-360, 360),
        scale: 0.1,
        ease: 'back',
        delay: 0.1 * index
      }, 0);
    });

    this.tl.then(() => this.revealImage());
  }

  revealImage() {
    const imgContainer = this.q('#img-container')[0];
    const img = this.q('img');

    this.tl.to(imgContainer, {
      width: '250px',
      height: '250px',
    })
      .to(img, {
        ease: 'linear',
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
        duration: 0.30,
      }, "<").call(() => this.moveImageToHeader());
  }

  moveImageToHeader() {
    const imgContainer = this.q('#img-container')[0];
    const img = this.q('img')[0];
    const lowerSpans = this.q('div > div > div > span');
    const target = document.querySelector('#simple-header');
    const targetRect = target!.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();
    const xOffset = targetRect.left - imgRect.left;
    const yOffset = targetRect.top - imgRect.top;

    this.tl.to(img, {
      x: xOffset + 32,
      y: yOffset + 8,
      width: '48px',
      height: '48px',
      filter: 'invert(0)',
      duration: 1,
      ease: 'power2.inOut',
    }).to(lowerSpans, {
      duration: 0.5,
      opacity: 0,
    }, ">").to(imgContainer, {
      marginLeft: '-240px',
      marginRight: '-240px',
      duration: 1,
      ease: 'power2.inOut',
    }, ">").call(() => this.revealHeader())
  }

  revealHeader() {
    this.tl.to(this.q('.z-50'), { opacity: 0, duration: 0.5 }, "<").call(() => {
      this.el.nativeElement.remove();
    });
  }

}

