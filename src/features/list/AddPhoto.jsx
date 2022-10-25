import { useState } from 'react';
import AWS from 'aws-sdk';

const AddPhoto = () => {
   const [progress, setProgress] = useState(0);
   const [selectedFile, setSelectedFile] = useState(null);
   const [showAlert, setShowAlert] = useState(false);

   const ACCESS_KEY = 'AKIAVU77BWJZ6JBI4CHD';
   const SECRET_ACCESS_KEY = '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';

   const RESION = 'us-east-1';
   const S3_BUCKET = 'team1-catdog-bucket';

   AWS.config.update({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
   });

   const myBucket = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: RESION,
   });

   const handleFileInput = (e) => {
      const file = e.target.files[0];
      console.log(file);
      setProgress(0);
      setSelectedFile(e.target.files[0]);

      //   const fileExt = file.name.split('.').pop();
      //   if (file.type !== 'image/jpeg' || fileExt !== 'jpg') {
      //      alert('jpg 파일만 Upload 가능합니다.');
      //      return;
      //   }
      //   setProgress(0);
      //   setSelectedFile(e.target.files[0]);
   };

   const uploadFile = (file) => {
      const params = {
         ACL: 'public-read',
         Body: file,
         Bucket: S3_BUCKET,
         Key: 'upload/' + file.name,
      };

      myBucket
         .putObject(params)
         .on('httpUploadProgress', (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100));
            setShowAlert(true);
            setTimeout(() => {
               setShowAlert(false);
               setSelectedFile(null);
            }, 3000);
         })
         .send((err) => {
            if (err) console.log(err);
         });
   };

   //    const uploadFile = (file) => {
   //       const params = {
   //          ACL: 'public-read',
   //          Body: file,
   //          Bucket: S3_BUCKET,
   //          Key: 'upload/' + file.name,
   //       };

   //       myBucket
   //          .putObject(params)
   //          .on('httpUploadProgress', (evt) => {
   //             setProgress(Math.round((evt.loaded / evt.total) * 100));
   //             setShowAlert(true);
   //             setTimeout(() => {
   //                setShowAlert(false);
   //                setSelectedFile(null);
   //             }, 3000);
   //          })
   //          .send((err) => {
   //             if (err) console.log(err);
   //          });
   //    };

   return (
      <div>
         <input type='file' onChange={handleFileInput} />
         {selectedFile ? (
            <button onClick={() => uploadFile(selectedFile)}> Upload </button>
         ) : null}
      </div>
   );
};

export default AddPhoto;
