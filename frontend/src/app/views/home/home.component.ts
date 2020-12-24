import {Component, OnInit} from '@angular/core';
import {UploadService} from '../../services/upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products = [];

  constructor(
    public service: UploadService
  ) {

  }

  ngOnInit(): void {
    this.service.getAllFiles().subscribe(res => {
      console.log(res);
      this.products = res;
    });
  }

}
