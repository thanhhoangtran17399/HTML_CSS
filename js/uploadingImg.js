const storage = firebase.storage();
function uploadImage(file) {
    return new Promise((resolve, reject) => {
        if (file) {
            const imgPath = "images/" + file.name;
            const storageRef = storage.ref(imgPath);
            const uploadTask = storageRef.put(file);
  
            uploadTask.on(
                "state_changed",
                null, 
                (error) => {
                    reject(error); // Handle errors
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        resolve(downloadURL); // Resolve the promise with the downloadURL
                    });
                }
            );
        } else {
            reject(new Error("No file selected"));
        }
    });
  }