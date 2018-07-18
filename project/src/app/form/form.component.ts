import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { ServerService } from '../server.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  animations: [
    trigger('colorChangeRed',  [
      transition(':leave', [ //* => void
        style({ backgroundColor: 'red', opacity: 0 }),
        animate(500, style({ backgroundColor: 'white', opacity: 1 }))
      ]),
    ]),
    
    trigger('colorChangeGreen',  [
      transition(':enter', [ //void => *
        style({ backgroundColor: 'green', opacity: 0 }),
        animate(1000, style({ backgroundColor: 'white', opacity: 1 }))
      ]),
    ]),
    trigger('fadeOut', [
      state('void', style({ 
        opacity: 0,
        transform: 'translateX(20px)',
      })),
       transition(':leave', [
         animate(350)
       ]),
    ]),
     trigger('greenColorInital', [
      state('*', style({ 
        opacity: 0,
        backgroundColor: 'green',
       })),
       transition(':leave', [
         animate(350)
       ]),
     ])
  ]
})
export class FormComponent implements OnInit {
  //To not get any errors values are defined
  data = {
    date_committed: null
  }

  notes = [];
  selectedId = 0;

  //Gets the data from the api
  dataCall(){
    this.http.get<any>('https://jasongiang-cacf8.firebaseio.com/data.json?print=pretty').subscribe(result => {
      this.notes = result[this.selectedId].notes;
      this.data = result[this.selectedId];
      //console.log(result[this.selectedId]);
    })
  }
  //Calls all functions to clear input
  clearAll() {
    this.notes = [];
  }

  //Deletes Item
  deleteItem(index){
    if (this.notes.length !== 1) {
      this.notes.splice(index, 1); 
    }
    else {
      this.notes = [
        {date: "3333-03-03", note: "Add a note now!"}
      ];
    }
  }
  //Updates All the input into the json file
  updateInput(noteUpdated,dateUpdated, selectedId){
    var updateUrl = "https://jasongiang-cacf8.firebaseio.com/data/" + selectedId + ".json?print=pretty"
      
    var updateObj = {
      noteUpdated: noteUpdated,
      dateUpdated: dateUpdated
    }
    
    this.http.patch(updateUrl, updateObj).subscribe(
      res => {
        console.log(res)
      }
    )
  }

  onAddServer(note: string) {
    this.notes.push({
      note: note,
      date: new Date().toISOString().slice(0,10),
    });
  }

  onSave() {
    this.getServer.storeServers(this.notes, this.selectedId)
    .subscribe(
      (response) => console.log(response), 
      (error) => console.log(error)
    );
  }

  constructor(private http: HttpClient,private getServer :ServerService) { 
  }

  
  
  ngOnInit(): void {
    this.dataCall();
  }

}
