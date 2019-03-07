import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserService } from '../../../user/services/user.service';
import { Card } from '../../models/card';
import { CardService } from '../../services/card.service';

@Component({
    selector: 'app-card-list',
    templateUrl: './card-list.component.html',
    styleUrls: ['./card-list.component.css'],
    animations: [
        // the fade-in/fade-out animation.
        trigger('simpleFadeAnimation', [

            // the "in" style determines the "resting" state of the element when it is visible.
            state('in', style({ opacity: 1 })),

            // fade in when created. this could also be written as transition('void => *')
            transition(':enter', [
                style({ opacity: 0 }),
                animate(500)
            ]),

            // fade out when destroyed. this could also be written as transition('void => *')
            transition(':leave',
                animate(300, style({ opacity: 0 })))
        ])
    ]
})
export class CardListComponent implements OnInit {
    cards: Card[];
    favicon = 'fa fa-window-restore';
    sectionName = 'Cards';
    displayName: string;

    constructor(
        private cardService: CardService,
        private userService: UserService,
    ) {
    }


    ngOnInit() {
        this.cardService.getAllCards().subscribe((cards: Card[]) => {
            if (cards) {
                this.cards = cards;
                cards.forEach((cardArr: Card) => {
                    if (cardArr) {
                        this.userService.getUser(cardArr.author).subscribe((user) => {
                            this.displayName = user.displayName;
                        });
                    }
                })
            }
        })

    }

    onDeletePageCard(id: string, title: string) {
        this.cardService.deletePageCard(id, title);
    }

}
