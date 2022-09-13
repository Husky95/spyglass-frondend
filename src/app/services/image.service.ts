import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url: string = environment.IMAGES_URI;

  constructor(private httpClient: HttpClient) { }

  imageUpload(image :any) :  Observable<any>  {
    console.log("test")
    const imageFormData = new FormData();
    imageFormData.append('file', image, image.name);
    return this.httpClient.post(this.url+"/upload", imageFormData, { observe: 'response' })
  }
}
