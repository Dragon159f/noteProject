import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';

import 'rxjs/Rx';

@Injectable()
export class ServerService {
    constructor(private http :Http) {}

    storeServers(data : any[], selectedId) {
        
        return this.http.put('https://jasongiang-cacf8.firebaseio.com/data/'+ selectedId +'/notes.json?print=pretty', 
                     data );
    }

    getServers(selectedId){
        return this.http.get('https://jasongiang-cacf8.firebaseio.com/data/' + selectedId + '/notes.json?print=pretty')
        .map(
            (response: Response) => {
                console.log(response);
                const data = response.json();
                for(const server of data){
                   server.name = 'FETCHED_' + server.name ;
                }
                return data;
            }
        );
    }
}