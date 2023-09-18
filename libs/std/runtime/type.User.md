# [std](/libs/std/)::[runtime](/libs/std/runtime/)::User

## Attributes

### email:&nbsp;[String](/libs/std/core/type.String.md)

### external:&nbsp;[bool](/libs/std/core/type.bool.md)

### full_name:&nbsp;[String](/libs/std/core/type.String.md)

### groups:&nbsp;[Array](/libs/std/core/type.Array.md)

### groups_flags:&nbsp;[int](/libs/std/core/type.int.md)

### permissions_flags:&nbsp;[int](/libs/std/core/type.int.md)

### role:&nbsp;[String](/libs/std/core/type.String.md)

## Methods
### fn all():&nbsp;[Array](/libs/std/core/type.Array.md)<Badge text="native" /><Badge text="static" />
### fn checkPassword(name:&nbsp;[String](/libs/std/core/type.String.md), pass:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[bool](/libs/std/core/type.bool.md)<Badge text="native" /><Badge text="static" />

Validates the password of the user `name`, if the user does not exist or the password does not match, `false` is returned.
### fn current():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" /><Badge text="static" />

Returns the currently logged-in user id.
### fn get(id:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[User](/libs/std/runtime/type.User.md)<Badge text="native" /><Badge text="static" />
### fn getByName(name:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[User](/libs/std/runtime/type.User.md)<Badge text="native" /><Badge text="static" />
### fn getToken(id:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" /><Badge text="static" />
### fn hasPermission(permission:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[bool](/libs/std/core/type.bool.md)<Badge text="native" /><Badge text="static" />

Returns `true` if the current connected user has the permission associated to the name passed as parameter, false otherwise.
### fn login(credentials:&nbsp;[String](/libs/std/core/type.String.md), use_cookie:&nbsp;[bool](/libs/std/core/type.bool.md)):&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" /><Badge text="static" />

If the given `credentials` are valid, returns a session `token`.

If `use_cookie` is `true`, the HTTP Response Headers will contain
a `Set-Cookie: greycat=<TOKEN> (...)`

This token can then be used by HTTP clients:
- as a bearer: `Authorization: <TOKEN>` _(note that 'bearer' is not specified)_
- as a cookie: `Cookie: greycat=<TOKEN>`
### fn logout():&nbsp;any?<Badge text="native" /><Badge text="static" />

logout cookie
### fn me():&nbsp;[User](/libs/std/runtime/type.User.md)<Badge text="native" /><Badge text="static" />

Returns the currently logged-in user.
### fn permissions():&nbsp;[Array](/libs/std/core/type.Array.md)<Badge text="native" /><Badge text="static" />

Returns the list of permissions of the currently logged-in user.
### fn renew(use_cookie:&nbsp;[bool](/libs/std/core/type.bool.md)):&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" /><Badge text="static" />

renew cookie
### fn set(entity:&nbsp;[SecurityEntity](/libs/std/runtime/type.SecurityEntity.md)):&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" /><Badge text="static" />
### fn setPassword(name:&nbsp;[String](/libs/std/core/type.String.md), pass:&nbsp;[String](/libs/std/core/type.String.md)):&nbsp;[bool](/libs/std/core/type.bool.md)<Badge text="native" /><Badge text="static" />
### fn tokenLogin(token:&nbsp;[String](/libs/std/core/type.String.md), use_cookie:&nbsp;[bool](/libs/std/core/type.bool.md)):&nbsp;[String](/libs/std/core/type.String.md)<Badge text="native" /><Badge text="static" />

If the given JWT `token` is valid (signed with the public key provided), returns a Greycat session `token`.

If `use_cookie` is `true`, the HTTP Response Headers will contain
a `Set-Cookie: greycat=<TOKEN> (...)`

This token can then be used by HTTP clients:
- as a bearer: `Authorization: <TOKEN>` _(note that 'bearer' is not specified)_
- as a cookie: `Cookie: greycat=<TOKEN>`
