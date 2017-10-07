//redirect if not logged in
if(window.localStorage.getItem('_id') === null)
{
  // window.location.replace('login.html');
}

function UpdateWordCount() {
  var MaxWordCt = 140;
  var R, GB = 0;

  var mLength = $('#tweet-input-box').val().length;
  // Compute RGB and cast them to int
  R = Math.round(128 + mLength * 127 / MaxWordCt);
  GB = Math.round(128 - mLength * 128 / MaxWordCt);
  // Clamp them within [0, 255]
  R = Math.min(255, R);
  GB = Math.min(255, GB);
  R = Math.max(0, R);
  GB = Math.max(0, GB);
  // Dec to Hex
  var hR = R.toString(16).toUpperCase();
  var hGB = GB.toString(16).toUpperCase();
  // Prepend "0" when hex value has only one digit
  hR = hR.length === 1 ? "0" + hR : hR;
  hGB = hGB.length === 1 ? "0" + hGB : hGB;
  // Get RGB string
  var mRGB = "#" + hR + hGB + hGB;
  // Change color to RGB
  $('#word-count').css('color', mRGB);

  // Disable tweet-button when user writes too much
  $('#word-count').text(MaxWordCt - $('#tweet-input-box').val().length);
  if ($('#tweet-input-box').val().length > MaxWordCt) {
      $('#tweet-button').prop('disabled', true);
  } else {
      $('#tweet-button').prop('disabled', false);
  }
}

$(document).ready(function () {

  var tweetBox = $('#tweet-input-box');
  var bDisplayIcon = false;
  var date = new Date();
  // Initialize webpage
  tweetBox.val("");
  UpdateWordCount();

  $('#tweet-button').click(function () {
      // return if tweet-button is disabled or length of input is 0
      if ($('#tweet-button').prop("disabled") === true)
      {
          return;
      }
      if (tweetBox.val().length === 0) {
          tweetBox.attr('placeholder', "You haven't write anything yet...");
          return;
      }

      // Submit data
      $.ajax({
          type: "POST",
          url: "/tweet",
          data: {
              content: tweetBox.val()
          },
          success: function (data) {
              if (data.error) {
                  console.error(data);
                  return;
              }
              console.log("Post request sent. Server says: " + data);
          }
      });

      // Get current date
      var mDate = date.getDate();
      var mMonth = date.getMonth();
      if (mDate < 10)
          mDate = "0" + mDate;
      if (mMonth < 10)
          mMonth = "0" + mMonth;
      var today = mMonth + "/" + mDate;
      // Replace line break with <br>
      var NewTweet = tweetBox.val().replace(/(\r\n|\n|\r)/g, '<br>');
      // Prepend li to the container so the most recent tweet will be the first li
      $('#tweet-list-container').prepend('<li><span>' + NewTweet + "<p id=\"date\">" + today + "</p>" + '</span></li>');
      tweetBox.val("");
      tweetBox.attr('placeholder', "What else...");
  });

  tweetBox.on('input', function(event) {
      UpdateWordCount();
  });

  tweetBox.keypress(function(event) {
      // When enter is pressed, click tweet button and update word-count
      if (event.which === 13 && !event.shiftKey) {
          $('#tweet-button').click();
          UpdateWordCount();
          event.preventDefault();
      }
  });
});
