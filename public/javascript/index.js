(function() {
  $(function() {
    $(".directions").on("click", ".remove-btn", function(event) {
      $(event.target)
        .parent()
        .remove();
    });

    $("#add").on("click", function() {
      $(".directions").append(
        '<div class="input-group"><input class="form-control" name="directions" type="text" placeholder="Instruction"><div class="input-group-append" id="button-addon4"></div><button class="btn btn-outline-secondary remove-btn" type="button">Remove</button></div>'
      );
    });
  });
})();
