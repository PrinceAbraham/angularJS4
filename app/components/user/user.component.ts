import { Component, OnInit } from '@angular/core';
import {FakeJsonDataService} from '../../services/fake-json-data.service';
import {GithubService} from '../../services/github.service';
import {CanActivate, Router, ActivatedRoute, RouterStateSnapshot, 
  CanActivateChild, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    name:string;
    age:number;
    email:string;
    address:Address;
    hobbies:string[];
    hello:any;
    isShowPosts:boolean;
    posts:Post[];

    searchName:string;
    private sub:any;

  constructor(private data:FakeJsonDataService, private githubService: GithubService, private activeRoute: ActivatedRoute) { 
    console.log('contructor ran');
    console.log('has search results', this.githubService.searchResults);
  }

  ngOnInit() {
    this.sub = this.activeRoute.params.subscribe(params =>{
      console.log(params);
      this.searchName = params.name;
    });
    this.githubService.searchUser(this.searchName).subscribe(result =>{
      console.log(result);
      this.githubService.searchResults = result.items;
    });
    this.name = 'John Doe';
    this.age = 30;
    this.email = 'jd@gmail.com';
    this.address = {
      street: '1432 SW 1st AVE',
      city: 'Miami',
      state:'FL'
    }
    this.hobbies = ['Write code', 'Watch movies', 'Read Scriptures', 'Play guitar']
    this.hello = 'I can do all things.'
    console.log('On Init');

    this.data.getPosts().subscribe((posts) =>{
      this.posts = posts;
      console.log(this.posts);
    })
  }
ngOnDestroy(){
  this.sub.unsubscribe();
}
  showPosts(){
    this.isShowPosts = true;
  }
addHobby(hobby){
  //this.hobbies.unshift(hobby); //To Push it to the beginning
  this.hobbies.push(hobby);
  return false;
}
deleteHobby(hobby){
for(let i =0; i < this.hobbies.length; i++){
  if(this.hobbies[i] == hobby){
    this.hobbies.splice(i,1);
  }
}
}
onSubmit(formValue){
console.log(formValue);
}
}

interface Address{
      street:string,
      city:string,
      state:string
    }

    interface Post{
      id: number,
      title:string,
      body:string,
      userId:number
    }