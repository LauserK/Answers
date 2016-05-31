exports.slugify = function(string) {
    var text = string.toString().toLowerCase().trim();
    var slug = text
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/&/g, '-and-')         // Replace & with 'and'
            .replace(/ñ/g, 'n')           // Replace ñ with n
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-');        // Replace multiple - with single -
            
    return slug;
};