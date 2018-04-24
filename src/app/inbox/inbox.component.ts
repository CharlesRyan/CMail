import { Component, OnInit } from '@angular/core';
import { MessageService } from "../message.service"

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  public messages;

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.messageService.getAllMessages()
      .subscribe(
        data => {
          console.log(data);
          
          this.messages = data;
        }
      );
  }

  delete(id){
    this.messageService.deleteById(id)
    .subscribe(
      data => {
        console.log(data);
      },
      err => console.log(err)
    );
  }
  

}
