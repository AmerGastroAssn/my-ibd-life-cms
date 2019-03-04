import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.css'],
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
export class ContactListComponent implements OnInit {
    contacts: Contact[];
    contacts$: Observable<Contact[]>;
    contact: Contact;
    id: string;
    $key: string;
    selectedContactFilter = 'sentDate';
    sortOptions: any[];
    favicon = 'fa fa-address-book';
    sectionName = 'Contacts';

    constructor(
        private contactService: ContactService,
        private route: ActivatedRoute,
    ) {
        this.sortOptions = [
            { value: 'sentDate', type: 'Default (Time Created - Ascending)' },
            { value: 'lastName', type: 'Last Name' },
            { value: 'viewed', type: 'Unread' },
            { value: 'subject', type: 'Subject' },
        ];
    }

    ngOnInit() {
        this.sortBy(this.selectedContactFilter);
        // // Get id from url
        this.id = this.route.snapshot.params['id'];
        // Get each contact's details
        this.contactService.getContact(this.id).subscribe((contactInfo) => {
            if (contactInfo !== null) {
                this.contact = contactInfo;
                console.log('this.contact', this.contact);
            }
        });
    }

    onDeleteContact(id) {
        this.contactService.deleteContact(id);
    }

    onMarkViewed(id) {
        this.contactService.setViewedContact(id);
    }

    onUnmarkViewed(id) {
        this.contactService.setUnviewedContact(id);
    }

    sortBy(selectedValue) {
        if (selectedValue !== 'viewed') {
            this.contacts$ = this.contactService.getAllContacts(selectedValue);
        } else {
            this.contacts$ = this.contactService.getAllUnviewedContacts();
        }
    }
}
