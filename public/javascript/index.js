(function() {
  $(function() {
    $(".instructions").on("click", ".removebtn", function(event) {
      $(event.target)
        .closest(".fields")
        .remove();
    });

    $("#add").on("click", function() {
      $(".instructions").append(
        '<div class="fields"> <div class="twelve wide field"><input type="text" name="instructions"></div><div class="four wide field"><button class="ui button">Remove Photo</button></div></div>'
      );
    });
  });
})();
