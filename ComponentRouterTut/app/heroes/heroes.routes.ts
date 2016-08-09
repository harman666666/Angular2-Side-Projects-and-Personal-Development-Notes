import { RouterConfig }          from '@angular/router';
import { HeroListComponent }     from './hero-list.component';
import { HeroDetailComponent }   from './hero-detail.component';


/*
The detail view is different. It displays a particular hero. 
It can't know which hero on its own. That information must come from outside. => look at detail to see how it utilized route parameter

Notice the :id token in the path. That creates a slot in the path for a Route Parameter. 
In this case, we're expecting the router to insert the id of a hero into that slot.
If we tell the router to navigate to the detail component and display "Makgneta", 
we expect hero id (15) to appear in the browser URL like this:
localhost:3000/hero/15
Route parameter or query parameter?
Embedding the route parameter token, :id, in the route definition path is a good choice for our scenario because the id is required by the HeroDetailComponent and because the value 15 in the path clearly distinguishes the route to "Magneta" from a route for some other hero.
A query parameter might be a better choice if we were passing an optional value to HeroDetailComponent.



We won't navigate to the detail component by clicking a link so we won't be adding a new RouterLink anchor tag to the shell.
Instead, when the user clicks a hero in the list, we'll command the router to navigate to the hero detail view for the selected hero.
We'll adjust the HeroListComponent to implement these tasks, beginning with its constructor which acquires the router service and the HeroService by dependency injection: => Take a look at hero list component



How does the target HeroDetailComponent learn about that id? Certainly not by analyzing the URL! That's the router's job.
The router extracts the route parameter (id:15) from the URL and supplies it to the HeroDetailComponent via the ActivatedRoute service.
As usual, we write a constructor that asks Angular to inject services that the component requires and reference them as private variables.
app/heroes/hero-detail.component.ts (Constructor) =>TAKE A LOOK AT HERO DETAIL
constructor(
  private route: ActivatedRoute,
  private router: Router,
  private service: HeroService) {}


*/

export const HeroesRoutes: RouterConfig = [
  { path: 'heroes',  component: HeroListComponent },
  { path: 'hero/:id', component: HeroDetailComponent }
];


