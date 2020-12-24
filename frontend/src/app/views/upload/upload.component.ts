import {Component, OnInit} from '@angular/core';
import {UploadService} from '../../services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  file: any;

  constructor(
    private service: UploadService
  ) {
  }

  ngOnInit(): void {
  }

  fileChanged(e): void {
    this.file = e.target.files[0];
  }

  uploadFile(): void {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      try {
        console.log(fileReader.result);
        console.log();
        // @ts-ignore
        this.service.uploadFile(JSON.parse(fileReader.result)).subscribe(res => {
          console.log(res);
          if (res.res === 'Ok') {
            alert('Se subieron los datos correctamente');
          } else {
            alert('Hubo un error');
          }
        });
      } catch (e) {
        alert('El archivo no es valido');
      }
    };
    fileReader.readAsText(this.file);

  }

}
