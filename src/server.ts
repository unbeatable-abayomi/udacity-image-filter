import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  //app.use(bodyParser.json());

  app.get("/filteredimage/", async ( req: Request, res: Response ) => {
    try {
      var { my_image_url_req } = req.query;
      if (!my_image_url_req) {
        return res.status(400)
          .send('URL FOR AN IMAGE IS NEEDED')
      }
      var imageUrlTostring = my_image_url_req.toString()
      const my_image_filtered = await filterImageFromURL(imageUrlTostring)
      res.status(200)
        .sendFile(my_image_filtered)
      res.on('finish', () => deleteLocalFiles([my_image_filtered]));
    } catch (error) {
      return res.status(500)
        .send('Image Could not Download Try Again')
    }
  });

  // app.get("/filteredimage/", async ( req: Request, res: Response ) => {
  //   try {
  //     var { my_image_url_req } = req.query;
  //     if (!my_image_url_req) {
  //       return res.status(400)
  //         .send('URL FOR AN IMAGE IS NEEDED')
  //     }
  //     var imageUrlTostring = my_image_url_req.toString()
  //     const my_image_filtered = await filterImageFromURL(imageUrlTostring)
  //     res.sendFile(my_image_filtered, options, function (err) {
  //       if (err) {
  //           next(err);
  //       } else {
  //           console.log('Sent:', my_image_filtered);
  //           next();
  //       }
  //   });
  //   });
  //   } catch (error) {
  //     return res.status(500)
  //       .send('Image Could not Download Try Again')
  //   }
  // });




  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();