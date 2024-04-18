var inventory;

(function() {
  inventory = {
    lastId: 0,
    collection: [],
    setDate: function() {
      var date = new Date();
      // $("#order_date").text(date.toUTCString());
      document.querySelector('#order_date').textContent = date.toUTCString();
    },
    cacheTemplate: function() {
      var iTmpl = document.querySelector("#inventory_item")
      this.template = Handlebars.compile(iTmpl.innerHTML);
      iTmpl.remove();
    },
    add: function() {
      this.lastId++;
      var item = {
        id: this.lastId,
        name: "",
        stock_number: "",
        quantity: 1
      };
      this.collection.push(item);

      return item;
    },
    remove: function(idx) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== idx;
      });
    },
    get: function(id) {
      var found_item;

      this.collection.forEach(function(item) {
        if (item.id === id) {
          found_item = item;
        }
      });

      return found_item;
    },
    update: function(inputItem) {
      var id = this.findID(inputItem);
      let item = this.get(id);

      // item.name = $item.find("[name^=item_name]").val();
      // item.stock_number = inputItem.find("[name^=item_stock_number]").val();
      // item.quantity = inputItem.find("[name^=item_quantity]").val();

      item.name = inputItem.querySelector(`[name="item_name_${id}`).textContent;
      item.stock_number = inputItem.querySelector(`[name="item_stock_number_${id}`).textContent;
      item.quantity = inputItem.querySelector(`[name="item_quantity_${id}`).textContent;
    },
    newItem: function(e) {
      e.preventDefault();
      var item = this.add();

      document.querySelector("#inventory").insertAdjacentHTML('beforeend', this.template({id: item.id}));
    },
    findParent: function(e) {
      return e.target.closest("tr");
    },
    findID: function(item) {
      return Number(item.querySelector("input[type=hidden]").value);
    },
    deleteItem: function(e) {
      e.preventDefault();
      // var item = this.findParent(e).remove();
      if (e.target.classList.contains('delete')) {
        let item = this.findParent(e);
        this.remove(this.findID(item));
        item.remove();
      }
    },
    updateItem: function(e) {
      if (e.target.tagName == 'INPUT') {
        let item = this.findParent(e);

        this.update(item);
      }
    },
    bindEvents: function() {
      // $("#add_item").on("click", this.newItem.bind(this));
      // $("#inventory").on("click", "a.delete", this.deleteItem.bind(this));
      // $("#inventory").on("blur", ":input", this.updateItem.bind(this));

      document.querySelector('#add_item').addEventListener('click', this.newItem.bind(this));
      document.querySelector('#inventory').addEventListener("click", this.deleteItem.bind(this));
      document.querySelector('#inventory').addEventListener('focusout', this.updateItem.bind(this));
    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }
  };
})();

// $(inventory.init.bind(inventory));

document.addEventListener('DOMContentLoaded', () => {
  inventory.init.bind(inventory)();
})