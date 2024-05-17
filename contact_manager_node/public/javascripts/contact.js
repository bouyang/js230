document.addEventListener('DOMContentLoaded', () => {
  function Manager() {
    this.searchItems = [];
    this.tags = ['work', 'friend'];
    this.bindEvents();
    this.displayContacts();
    this.displayTags();

    Handlebars.registerPartial('contactsItemTemplate', document.getElementById('contactsItemTemplate').innerHTML);
  }

  Manager.prototype = {
    bindEvents() {
      this.bindAddContact();
      this.bindSearch();
      this.bindContactsListEvents();
    },

    bindAddContact() {
      document.getElementById('addContact').addEventListener('click', event => {
        this.createAddContact(event);
      });
    },

    createAddContact(event) {
      event.preventDefault();

      let form = document.getElementById('contactForm');
      if (form) {
        form.remove();
      }
        this.createNewContactForm();
        this.bindAddFormEvents();
        this.hideContactsList();
    },

    createNewContactForm() {
      let newContactTemplate = Handlebars.compile(document.getElementById('newContactTemplate').innerHTML);
      document.getElementById('topSection').insertAdjacentHTML('afterend', newContactTemplate({tag: this.tags}));
    },

    showContactsList() {
      let contactsList = document.getElementById('contactsList');
      let topSection = document.getElementById('topSection');
      contactsList.style.display = 'inline';
      topSection.style.display = 'inline';
    },

    hideContactsList() {
      let contactsList = document.getElementById('contactsList');
      let topSection = document.getElementById('topSection');
      contactsList.style.display = 'none';
      topSection.style.display = 'none';
    },

    bindAddFormEvents() {
      let form = document.getElementById('contactForm');
      let cancelButton = form.querySelector('input[value="Cancel"]');

      cancelButton.addEventListener('click', event => {
        form.style.display = 'none';
        this.showContactsList();
      });

      form.addEventListener('submit', event => {
        this.addContactSubmit(event);
      });
    },

    addContactSubmit(event) {
      event.preventDefault();
        
      let form = document.getElementById('contactForm');
      let formData = new FormData(form);
      let result = {};
      result['tags'] = this.tagsToJson(form);

      for (const pair of formData.entries()) {
        result[pair[0]] = pair[1];
      }

      let validInputCheck = this.validInput(result);

      if (validInputCheck.length === 0) {
        fetch(form.action, {
          method: form.method,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(result),
        })
        .then(response => response.json())
        .then(json => {
          form.reset();
          form.style.display = 'none';
          this.showContactsList();
          this.displayContacts();
        });
      } else {
        this.displayErrors(validInputCheck);
      }
    },

    tagsToJson(form) {
      let result = [];
      let tags = form.querySelectorAll('input[type="checkbox"]');
      for (let i = 0; i < tags.length; i += 1) {
        if (tags[i].checked) {
          result.push(tags[i].value);
        }
      }
      return result.join();
    },

    validInput(input) {
      let result = [];

      if (input['full_name'] === '') {
        result.push('full_name_error');
      }
      if (input['email'] === '') {
        result.push('email_error');
      }
      if (input['phone_number'] === '') {
        result.push('phone_number_error')
      }

      return result;
    },

    displayErrors(input) {
      this.clearErrors();
      input.forEach(element => {
        let box = document.getElementsByClassName(element)[0];
        box.textContent = 'Cannot be empty';
      });
    },

    clearErrors() {
      let errors = document.getElementsByClassName('error');
      for (let i = 0; i < errors.length; i += 1) {
        errors[i].textContent = '';
      }
    },

    async displayContacts() {
      let allContacts = await this.getAllContacts();

      let contactsListTemplate = Handlebars.compile(document.getElementById('contactsListTemplate').innerHTML);
      document.getElementById('contactsList').innerHTML = '';
      document.getElementById('contactsList').insertAdjacentHTML('beforeend', contactsListTemplate({'item': allContacts}));
    },

    displaySearchedContacts(input) {
      if (input.length > 0) {
        let contactsListTemplate = Handlebars.compile(document.getElementById('contactsListTemplate').innerHTML);
        document.getElementById('contactsList').innerHTML = '';
        document.getElementById('contactsList').insertAdjacentHTML('beforeend', contactsListTemplate({'item': input}));
      } else {
        document.getElementById('contactsList').innerHTML = `<h2>There are no contacts with that query</h2>`;
      }
        
    },

    async getAllContacts() {
      return fetch('/api/contacts', {
        method: 'GET',
      })
      .then(response => {
        return response.json()
      });
    },

    bindContactsListEvents() {
      document.getElementById('contactsList').addEventListener('click', this.handleContactsListEvents.bind(this));
    },

    handleContactsListEvents(event) {
      event.preventDefault();

      let id = Number(event.target.id.split('_')[1]);

      switch (event.target.value) {
        case 'Delete':
          this.deleteItem(id);
          this.displayContacts();
          break;
        case 'Edit':
          this.editItem(id);
          break;
      }
    },

    deleteItem(id) {
      if (window.confirm('Do you want to delete the contact?')) {
        fetch(`/api/contacts/${id}`, {
          method: 'DELETE',
        });
      }
    },

    editItem(id) {
      this.createEditForm(id);
      this.bindEditFormEvents();
    },

    createEditForm(id) {
      fetch(`/api/contacts/${id}`, {
        method: 'GET',
      })
      .then(response => response.json())
      .then(json => {
        let editItemTemplate = Handlebars.compile(document.getElementById('editItemTemplate').innerHTML);
        if (document.getElementById('editItemForm')) {
          document.getElementById('editItemForm').remove();
        }
        json['tag'] = this.tags;
        document.getElementById('topSection').insertAdjacentHTML('afterend', editItemTemplate(json));
        this.bindEditFormEvents();
      });
    },

    bindEditFormEvents() {
      let form = document.getElementById('editItemForm');
      let cancelButton = form.querySelector('input[value="Cancel"]');

      cancelButton.addEventListener('click', event => {
        form.style.display = 'none';
        this.showContactsList();
      })

      form.addEventListener('submit', event => {
        this.editContact(event);
      });

      this.hideContactsList();
    },

    editContact(event) {
      event.preventDefault();

      let form = document.getElementById('editItemForm');
      let formData = new FormData(form);
      let result = {};

      for (const pair of formData.entries()) {
        result[pair[0]] = pair[1];
      }

      let validInputCheck = this.validInput(result);
      if (validInputCheck.length === 0) {
        fetch(form.action, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(result),
        })
        .then(response => {
          form.reset();
          form.style.display = 'none';
          this.showContactsList();
          this.displayContacts();
        });
      } else {
        this.displayErrors(validInputCheck);
      }
      
    },

    bindSearch() {
      let search = document.getElementById('search');

      search.addEventListener('keyup', event => {
        this.searchContacts(event);
      });
    },

    async searchContacts(event) {
      let query = event.target.value;

      if (query) {
        this.searchItems = await this.findSearchedItems(query);
        this.displaySearchedContacts(this.searchItems);
      } else {
        this.displayContacts();
      }
    },

    async findSearchedItems(query) {
      let regex = new RegExp(query, 'i');

      let allContacts = await this.getAllContacts();
      return allContacts.filter(contact => {
        return regex.test(contact['full_name'])
      });
    },

    displayTags() {
      let tagTemplate = Handlebars.compile(document.getElementById('tagTemplate').innerHTML);
      document.getElementById('tagsSection').innerHTML = '';
      document.getElementById('tagsSection').insertAdjacentHTML('beforeend', tagTemplate({tag: this.tags}));
      this.bindTagEvents();
    },

    bindTagEvents() {
      document.getElementById('tagsSection').addEventListener('click', event => {
        this.handleTag(event);
      });
    },

    async handleTag(event) {
      let listId = event.target.id;
      if (listId === 'createTag') {
        this.createTagForm();
      } else if (listId === 'selectAllTags') {
        this.displayContacts();
      } else if (listId.split('_')[0] === 'tag') {
        let searchedTags = await this.filterByTag(listId);
        this.displaySearchedContacts(searchedTags);
      }
    },

    createTagForm() {
      let createTagFormTemplate = Handlebars.compile(document.getElementById('createTagFormTemplate').innerHTML);
      document.getElementById('createTagSection').innerHTML = '';
      document.getElementById('createTagSection').insertAdjacentHTML('afterbegin', createTagFormTemplate());
      this.bindTagFormEvents();
    },

    bindTagFormEvents() {
      let form = document.getElementById('createTagForm');

      let cancelButton = form.querySelector('input[value="Cancel"]');

      cancelButton.addEventListener('click', event => {
        form.style.display = 'none';
        this.showContactsList();
      });

      form.addEventListener('submit', event => {
        event.preventDefault();
        document.getElementById('tagError').textContent = '';

        let newTag = document.getElementById('newTag').value;

        if (this.validTag(newTag)) {
          this.tags.push(newTag);
          form.reset();
          this.displayTags();
        } else {
          document.getElementById('tagError').textContent = 'Tag already exists or is invalid';
        }
      });
    },

    validTag(tag) {
      return !this.tags.includes(tag) && tag !== '';
    },

    async filterByTag(tagId) {
      let tagName = tagId.split('_')[1];

      let allContacts = await this.getAllContacts();;
      return allContacts.filter(contact => {
        if (contact['tags']) {
          return contact['tags'].split(',').includes(tagName);
        }
      });
    },
  }

  new Manager;

});