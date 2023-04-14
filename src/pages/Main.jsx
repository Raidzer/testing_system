import React, { useEffect } from "react";
import httpService from "../service/http.service";

export default function Main() {

    useEffect(() => {
        async function test() {
            const { data } = await httpService.get('/test/user');
            console.log(data)
        }
        test();
    }, []);

    return (
        <div>
            Привет
        </div>
    )
}