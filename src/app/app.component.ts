import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myForm: FormGroup;
  placeForm: FormGroup;
  public markers: any[];
  public zoom;
  long
lat
  center: any;
  city
  places: any;
search=false
hide='Map'
  constructor(private formbuilder: FormBuilder,private apiService: ApiService,private toastr:ToastrService ) { 
    this.myForm = new FormGroup({
      cityName: new FormControl("", Validators.required),
    }),
    this.placeForm = new FormGroup({
      // location: new FormControl("", Validators.required),
      search: new FormControl("", Validators.required),
      radius: new FormControl("", Validators.required),
    }),
      this.markers = [];this.zoom=17}

  ngOnInit() {
    this.getLocation()
  
    
    // this.markers.push({
    //   position: {
    //     lat: this.latitude,
    //     lng: this.longitude
    //   },
    //   label: {
    //     color: "black",
    //     text: "Bengaluru"
    //   }
    // });
 
}

getLocation(): void{
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        this.long = position.coords.longitude;
        this.lat = position.coords.latitude;
        console.log(position.coords.longitude,position.coords.latitude);
        this.center = { lat: position.coords.latitude, lng: position.coords.longitude };
        this.markers.push({
          position: {
            lat:position.coords.latitude,
            lng:position.coords.longitude
          },
          label: {
            color: "black",
            // text: "Bengaluru"
          }
        });
        // this.callApi(longitude, latitude);
      });
  } else {
     console.log("No support for geolocation")
  }
}
cityToCoordinate(){
  this.apiService.cityToCoordinate(this.myForm.value.cityName).subscribe((data: any) => { 
    if (data.status== 200) {
        this.toastr.success('Location Fetched!');
      this.search=true
      this.lat = data.body[0].latitude;
      this.long = data.body[0].longitude;
      this.center = { lat: data.body[0].latitude, lng: data.body[0].longitude };
   let datas = this.markers.push({
        position: {
          lat:data.body[0].latitude,
          lng:data.body[0].longitude
        },
        label: {
          color: "black",
          // text: "Bengaluru"
        }
      });
      this.markers[0] = datas;
    }
   });
}
nearByPlace(){
  this.apiService.nearByPlace(this.lat,this.long,this.placeForm.value.search,this.placeForm.value.radius).subscribe((data: any) => {
    
    if (data.status== 200) {
      this.toastr.success('Success');
   this.places=data.body.results
   data.body.results.forEach(e => {
    this.center = { lat: e.location.lat, lng: e.location.lng };
    this.markers.push({
      position: {
        lat:e.location.lat,
        lng:e.location.lng
      },
      label: {
        color: "white",
         text: e.name
      }
    });
  
});
    }
  
    else{
      this.toastr.error('Invalid Request');
     }
  
      
    
    
  
//    let datas = {position: {
//     lat:data.body[0].latitude,
//     lng:data.body[0].longitude
//   },
//   label: {
//     color: "black",
//     // text: "Bengaluru"
//   }
// }

  // this.markers[0] = datas;
   });


}

// callApi(Longitude: number, Latitude: number){
//   const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${Longitude}&lat=${Latitude}`
//   //Call API
// }
clear(){
  this.markers=[]
}
change(e,pt){
this.hide=pt
}
}
