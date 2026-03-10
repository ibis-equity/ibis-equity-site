import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './splash.html',
  styleUrl: './splash.css'
})
export class SplashComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('videoPlayer') videoPlayer?: ElementRef<HTMLVideoElement>;
  private timerId?: number;
  isExiting = false;
  isMuted = true;
  debugMessage = '';
  hasUnmuted = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.timerId = window.setTimeout(() => {
      this.navigateToMain();
    }, 20000);
  }

  ngAfterViewInit(): void {
    // Try to play video with sound immediately
    this.tryPlayVideo();
    setTimeout(() => this.tryPlayVideo(), 100);
    setTimeout(() => this.tryPlayVideo(), 500);
  }

  tryPlayVideo(): void {
    if (!this.videoPlayer?.nativeElement) return;
    
    const video = this.videoPlayer.nativeElement;
    
    // Try unmuted first
    video.muted = false;
    this.isMuted = false;
    
    video.play().then(() => {
      console.log('Video playing with sound');
      this.hasUnmuted = true;
    }).catch(() => {
      // If unmuted fails, try muted
      video.muted = true;
      this.isMuted = true;
      video.play().then(() => {
        console.log('Video playing muted - waiting for user interaction');
      }).catch(err => {
        console.error('Video play failed:', err);
      });
    });
  }

  onVideoLoaded(): void {
    // Video is ready, try to play
    if (this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.play().catch(err => {
        console.log('Play prevented:', err);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  @HostListener('document:keydown.enter')
  onEnterKey(): void {
    this.unmuteAndNavigate();
  }

  @HostListener('click')
  onClick(): void {
    this.unmuteAndNavigate();
  }

  private unmuteAndNavigate(): void {
    // Ensure video is unmuted (in case browser blocked it initially)
    if (this.videoPlayer?.nativeElement && !this.hasUnmuted) {
      this.videoPlayer.nativeElement.muted = false;
      this.isMuted = false;
      this.hasUnmuted = true;
      this.videoPlayer.nativeElement.play().catch(() => {});
    }
    this.navigateToMain();
  }

  private navigateToMain(): void {
    if (this.isExiting) return;
    
    this.isExiting = true;
    // Wait for fade-out animation to complete
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 600);
  }
}
