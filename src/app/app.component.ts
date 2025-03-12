import { Component, DestroyRef } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { SlideItemInterface } from 'src/shared/models/slide-item.interface';
import { interval } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[
    trigger('fadeAnimation',[
      transition('* => *',[
        style({opacity: 0}),
        animate('2000ms ease-in-out',
          style({opacity: 1})
        )
      ])
    ])
  ]
})
export class AppComponent {
  slides: SlideItemInterface[] = [
    {
      id: 1,
      title: 'Isle of Skye',
      titleAr: 'جزيرة سكاي',
      location: 'Scotland',
      locationAr: 'اسكتلندا',
      description: 'A beautiful island known for its dramatic landscapes, from mountains and valleys to lakes and shores.',
      descriptionAr: 'جزيرة خلابة تشتهر بالمناظر الطبيعية الدرامية، من الجبال والوديان إلى البحيرات والشواطئ. توفر تجربة استثنائية لمحبي المغامرات والمشي في الطبيعة.',
      image: '/assets/images/1.png',
      thumbnail: '/assets/images/1.png'
    },
    {
      id: 2,
      title: 'Amazon Rainforest',
      titleAr: 'غابة الأمازون',
      location: 'Brazil',
      locationAr: 'البرازيل',
      description: 'The largest tropical rainforest in the world, home to millions of species of plants and animals.',
      descriptionAr: 'أكبر غابة استوائية في العالم، موطن لملايين الأنواع من النباتات والحيوانات. تعتبر رئة الأرض وتوفر تجربة فريدة للمستكشفين.',
      image: '/assets/images/2.png',
      thumbnail: '/assets/images/2.png'
    },
    {
      id: 3,
      title: 'Wadi Rum',
      titleAr: 'وادي الرم أو وادي القمر',
      location: 'Jordan',
      locationAr: 'الأردن',
      description: 'A desert valley known for its red sand, monolithic rock formations, and ancient history.',
      descriptionAr: 'وادي صحراوي يشتهر برماله الحمراء وتكويناته الصخرية الضخمة وتاريخه القديم. يوفر تجربة فريدة للمغامرين ومحبي الطبيعة.',
      image: '/assets/images/3.png',
      thumbnail: '/assets/images/3.png'
    },
    {
      id: 4,
      title: 'Matterhorn',
      titleAr: 'جبل ماترهورن',
      location: 'Switzerland',
      locationAr: 'سويسرا',
      description: 'One of the highest peaks in the Alps, known for its distinctive pyramid shape.',
      descriptionAr: 'أحد أعلى قمم جبال الألب، يشتهر بشكله الهرمي المميز. وجهة مثالية لمتسلقي الجبال ومحبي المناظر الطبيعية الخلابة.',
      image: '/assets/images/4.png',
      thumbnail: '/assets/images/4.png'
    },
    {
      id: 5,
      title: 'Iguazu Falls',
      titleAr: 'شلالات إيجوازو',
      location: 'Argentina/Brazil',
      locationAr: 'الأرجنتين/البرازيل',
      description: 'A system of 275 waterfalls at the border of Argentina and Brazil, one of the most spectacular in the world.',
      descriptionAr: 'نظام من 275 شلالًا على حدود الأرجنتين والبرازيل، من أكثر الشلالات إثارة للإعجاب في العالم. منظر طبيعي مذهل يجذب السياح من جميع أنحاء العالم.',
      image: '/assets/images/5.png',
      thumbnail: '/assets/images/5.png'
    }
  ];
  
  currentSlide = 0;
  slideInterval = 6000; 
  private isPlaying = true;

  constructor(private destroyRef: DestroyRef){
    interval(this.slideInterval).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      if(this.isPlaying){
        this.nextSlide()
      }
    })
  }
  
  pauseAutoSlide() {
    this.isPlaying = false;
  }
  
  resumeAutoSlide() {
    this.isPlaying = true;
  }
  
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }
  
  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
  
  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
