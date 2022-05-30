
PennController.ResetPrefix(null);
PennController.AddHost("https://github.com/aineito/PCIbex_picture_naming/")
PennController.DebugOff()
PennController.Sequence("welcome","demographics","instructions","picture_naming", "send", "final")

var showProgressBar = true;

PennController("welcome",
  newHtml("intro", "welcome_screen.html")
    .print()
    ,
  newButton("consent", "Continue")
    .settings.center()
    .print()
    .wait(
        getHtml("intro").test.complete()
            .failure( getHtml("intro").warn() ) )
    );

PennController("demographics",
  newHtml("demographics", "demographics_screen.html")
    .settings.log()
    .print()
    ,
  newButton("continue", "Continue")
    .settings.center()
    .print()
    .wait(
        getHtml("demographics").test.complete()
            .failure( getHtml("demographics").warn() ) )
    );

PennController("instructions",
  newText("heading","INSTRUCTIONS:")
     .settings.css("font-size", "24px")
     .print()
     ,
  newText("instructions","<p>In this test, you will see pictures, and your task is to type their names"
          +" (how you would call what is depicted in each picture).</p>"
          +"<p>There will be many pictures, so please try not to spend too much time and simply type the name that first comes to mind.</p>"
          +"<p>There is no need to type an article (a, an, the).</p>")
     .settings.css("font-size", "20px")
     .print()
     ,
  newCanvas("empty canvas", 1, 10) // add some space
     .print()
     ,
  newText("heading","EXAMPLE:")
     .settings.css("font-size", "24px")
     .print()
     ,
  newImage("eg_pic1","watch.jpg")
    .settings.center()
    .print()
    ,
  newText("eg_pic1_name","watch")
    .settings.center()
    .settings.css("font-size", "30px")
    .print()
    ,
  newCanvas("empty canvas", 1, 10) // add some space
    .print()
    ,
  newButton("continue", "Continue")
    .settings.center()
    .print()
    .wait()
    ,
    newCanvas("empty canvas", 1, 10) // add some space
      .print()
    );

PennController.Template( PennController.GetTable("picture_naming_stimuli.csv"), // creates a template to be used for multiple trials; will use .csv in chunk_includes
                            variable =>
PennController("picture_naming",
    newText("reminder", "Please type the name of what is in the picture and click 'Continue'")
        .settings.css("font-size", "20px")
        .settings.center()
        .print()
        ,
   newCanvas("empty canvas", 1, 50) // add some space
       .print()
       ,
   newImage("image", variable.File_name)
       .settings.css("font-size", "20px")
       .settings.center()
       .print()
       ,
   newCanvas("empty canvas", 1, 10) // add some space
      .print()
      ,
   newTextInput("response_input","")
      .print()
      .settings.log()
      .settings.center()
      .lines(1)
      .size(300, 30)
      ,
  newCanvas("empty canvas", 1, 10) // add some space
     .print()
     ,
  newVar("response")
       .set(getTextInput("response_input"))
       .global()
       ,
   newButton("Continue", "Continue")
        .settings.center()
        .print()
        .wait()
        ,
    getText("reminder")
        .remove()
        ,
    getButton("Continue")
        .remove()
      )

    .log("Item", variable.Item) // record item ID
    .log("Picture_type", variable.Picture_type) // record picture Picture_type
    .log("File_name", variable.File_name) // record image file name
    .log("Response", getVar("response")) // record participants' response
  );

PennController.SendResults("send")

PennController("final",
  newText("thanks","This is the end of the test.<br>Thank you for taking part!")
  .settings.center()
  .settings.css("font-size","30px")
  .print()
  ,
  newButton("void")
  .wait()
);
