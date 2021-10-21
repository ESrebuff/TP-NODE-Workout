export const show_register = (req, res) => {
    if(!checkAuth(req, res)) {
        res.render('register', { user:false, session : checkAuth(req, res) })
    } else res.redirect('/')
}

export const show_connect = (req, res) => {
    if(!checkAuth(req, res)) {
        res.render('connect', { user : "", session : checkAuth(req, res) })
    } else res.redirect('/')
}

export const disconnect_account = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}

export const show_form_exo = (req, res) => {
    const admin = checkAuth(req, res)
    if(admin.role) {
        res.render('form', { session : checkAuth(req, res) })
    } else res.redirect('/')
}

function checkAuth(req, res) {
    if(req.session.user) {
        return req.session.user
    }
    return false
}