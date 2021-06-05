import { Component, OnInit } from '@angular/core';
import { ScreenCapture } from '../../model/screen-capture.model';
import { ScreenService } from '../../services/screen.service';

@Component({
  selector: 'app-user-screenlist',
  templateUrl: './user-screenlist.component.html',
  styleUrls: ['./user-screenlist.component.css']
})
export class UserScreenlistComponent implements OnInit {
  public screenList = [];
  constructor(private screenService: ScreenService) { }

  ngOnInit(): void {
    this.getAllScreen();
  }

  getAllScreen():void{
    this.screenService.getScreenList().subscribe(result=>{
      result = JSON.parse(JSON.stringify(result));
      if (result['success']){
        result['data'].forEach(element => {
          this.screenList.push(new ScreenCapture(element))
        });
      }
    })
  }
  onClickDelete(screen: Screen):void{
    console.log(screen);
  }

}
