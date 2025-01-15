import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { PhotoService } from '../../services/photo.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface photo  {
  itemImageSrc: string,
  thumbnailImageSrc: string,
  alt: string,
  title: string

}

@Component({
  selector: 'app-nuestra-casa',
  standalone: true,
  templateUrl: './nuestra-casa.component.html',
  imports: [GalleriaModule,CommonModule,ReactiveFormsModule,FormsModule],
  providers: [PhotoService],
  styleUrl: './nuestra-casa.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NuestraCasaComponent implements OnInit   {

  private cd : ChangeDetectorRef = inject (ChangeDetectorRef)

  images: photo []  | undefined

  onValueChange(event: any) {
    this.images = event;
}


    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

constructor(private photoService: PhotoService) {}

ngOnInit(): void {
    // Llama al servicio y asigna las imágenes
    this.photoService.getImages().then((images) => {
      this.images = images;
      this.cd.detectChanges()
      console.log(images)
    });

}
}
