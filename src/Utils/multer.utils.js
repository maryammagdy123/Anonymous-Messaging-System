import multer, { diskStorage } from "multer";

export const uploadFiles = () => {
  return multer({
    storage: diskStorage({
      destination: "uploads",
      filename: (req, file, cb) => {
        cb(null, Date.now() + Math.random() + "__" + file.originalname);
      },
    }),
  });
};

/**filename:(req,file,cn)=>{}
 * file returns an object => fieldname,originalname,encoding,mimetype
 */
