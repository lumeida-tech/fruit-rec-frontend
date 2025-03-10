"use server"

import { redirect } from "next/navigation"
import { getCookie } from "./cookies.action"
import { _User } from "@/types/user.zod"

const isAuthenticatedOrRedirect = async (notRedirect: boolean=false) => {
    const URL = process.env.BAKEND_URL ?? ""
    const token = await getCookie("auth_token")
    try {
        const response = await fetch(URL + `/api/auth/is-authenticated/${token}`, {
            method: "POST",
            credentials: "include"
        })

        const result: { is_authenticated: boolean, user: _User } = await response.json()
        if (!result.is_authenticated && !notRedirect) redirect("/auth/login")
        return result.user
    } catch (err) {
        console.error(err)
        if(notRedirect) return null
        redirect("/auth/login")
    }
}

export {isAuthenticatedOrRedirect}
