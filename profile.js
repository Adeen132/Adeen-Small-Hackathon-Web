document.addEventListener("DOMContentLoaded", () => {
    const profileImage = document.getElementById("profile_image");
    const imageInput = document.getElementById("image_input");

    profileImage.addEventListener("click", () => {
        imageInput.click();
    });

    imageInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
                localStorage.setItem("profileImage", e.target.result);  // Save the new image URL
            };
            reader.readAsDataURL(file);
        }
    });

    const savedProfileImage = localStorage.getItem("profileImage");
    if (savedProfileImage) {
        profileImage.src = savedProfileImage;
    }
});
