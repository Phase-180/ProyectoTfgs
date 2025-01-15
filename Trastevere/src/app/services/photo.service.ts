import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface Photo  {
  itemImageSrc: string,
  thumbnailImageSrc: string,
  alt: string,
  title: string

}



@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }


  images: Photo []  = [{
    itemImageSrc: '/assets/fotos/trt.jpeg',
    thumbnailImageSrc: '/assets/fotos/trt.jpeg',
    alt: 'Description for Image 1',
    title: 'Title 1'
},{
  itemImageSrc: '/assets/fotos/3.jpeg',
  thumbnailImageSrc: '/assets/fotos/3.jpeg',
  alt: 'Description for Image 1',
  title: 'Title 1'
},{
  itemImageSrc: '/assets/fotos/4.jpeg',
  thumbnailImageSrc: '/assets/fotos/4.jpeg',
  alt: 'Description for Image 1',
  title: 'Title 1'
},{
  itemImageSrc: '/assets/fotos/5.jpeg',
  thumbnailImageSrc: '/assets/fotos/5.jpeg',
  alt: 'Description for Image 1',
  title: 'Title 1'
},
{
  itemImageSrc: '/assets/fotos/6.jpeg',
  thumbnailImageSrc: '/assets/fotos/6.jpeg',
  alt: 'Description for Image 1',
  title: 'Title 1'
},
{
  itemImageSrc: '/assets/fotos/7.jpeg',
  thumbnailImageSrc: '/assets/fotos/7.jpeg',
  alt: 'Description for Image 1',
  title: 'Title 1'
},
{
  itemImageSrc: '/assets/fotos/8.jpeg',
  thumbnailImageSrc: '/assets/fotos/8.jpeg',
  alt: 'Description for Image 1',
  title: 'Title 1'
},
{
  itemImageSrc: '/assets/fotos/9.jpeg',
  thumbnailImageSrc: '/assets/fotos/9.jpeg',
  alt: 'Description for Image 1',
  title: 'Title 1'
},
{
  itemImageSrc: '/assets/fotos/10.jpeg',
  thumbnailImageSrc: '/assets/fotos/10.jpeg',
  alt: 'Description for Image 1',
  title: 'Title 1'
},
{
  itemImageSrc: '/assets/fotos/11.jpeg',
  thumbnailImageSrc: '/assets/fotos/11.jpeg',
  alt: 'Description for Image 1',
  title: 'Title 1'
},
{
  itemImageSrc: '/assets/fotos/12.jpeg',
  thumbnailImageSrc: '/assets/fotos/12.jpeg',
  alt: 'Description for Image 1',
  title: 'Title 1'
},
{
  itemImageSrc: '/assets/fotos/13.jpeg',
  thumbnailImageSrc: '/assets/fotos/12.jpeg',
  alt: 'Description for Image 1',
  title: 'Title 1'
},
{
  itemImageSrc: '/assets/fotos/14.jpeg',
  thumbnailImageSrc: '/assets/fotos/12.jpeg',
  alt: 'Description for Image 1',
  title: 'Title 1'
},]



 // Método para obtener las imágenes como un array directamente
  getImages(): Promise<Photo[]> {
  return Promise.resolve(this.images);
}

// Método para obtener las imágenes como un Observable
getImagesAsObservable(): Observable<Photo[]> {
  return of(this.images);
}


}
