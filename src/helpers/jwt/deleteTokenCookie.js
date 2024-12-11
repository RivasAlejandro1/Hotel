export const deleteTokenCookie = (req, res) => {
    res.cookies("jwt", "", {maxAge: 1});
    res.redirect("/");
}
