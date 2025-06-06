/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/company": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * CompanyIndex
         * @description 企業情報を管理
         *
         *     GET /api/company
         */
        get: operations["company.index"];
        put?: never;
        /**
         * CompanyStore
         * @description 企業情報を管理
         *
         *     POST /api/company
         */
        post: operations["company.store"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/company/{company}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * CompanyShow
         * @description 企業情報を管理
         *
         *     GET /api/company/{id}
         */
        get: operations["company.show"];
        /**
         * CompanyUpdate
         * @description 企業情報を管理
         *
         *     PUT /api/company/{id}
         */
        put: operations["company.update"];
        post?: never;
        /**
         * CompanyDestroy
         * @description 企業情報を管理
         *
         *     DELETE /api/company/{id}
         */
        delete: operations["company.destroy"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/deadline": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Deadline
         * @description ESやテストの締め切りを管理
         */
        get: operations["deadline.index"];
        put?: never;
        post: operations["deadline.store"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/deadline/{deadline}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["deadline.show"];
        put: operations["deadline.update"];
        post?: never;
        delete: operations["deadline.destroy"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** ユーザ認証 */
        get: operations["me"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/mypage": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * MyPage.index
         * @description マイページ一覧を表示
         */
        get: operations["mypage.index"];
        put?: never;
        post: operations["mypage.store"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/mypage/create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["mypage.create"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/mypage/{mypage}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["mypage.show"];
        put: operations["mypage.update"];
        post?: never;
        delete: operations["mypage.destroy"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** CompanyRequest */
        CompanyRequest: {
            name: string;
        };
        /** CompanyResource */
        CompanyResource: {
            id: number;
            name: string;
        };
        /** DeadlineRequest */
        DeadlineRequest: {
            /** Format: date-time */
            date: string;
            type: number;
            status: number;
            result: number;
            company_id: number;
            my_page_id: number;
        };
        /** DeadlineResource */
        DeadlineResource: {
            id: number;
            date: string;
            type: string;
            status: number;
            result: number;
            myPage?: components["schemas"]["MyPageResource"];
        };
        /** MyPageRequest */
        MyPageRequest: {
            link: string;
            login_id: string;
            type: string;
            priority: number;
            company_id: number;
        };
        /** MyPageResource */
        MyPageResource: {
            id: number;
            link: string;
            login_id: string;
            priority: number;
            type: string;
            company?: components["schemas"]["CompanyResource"];
        };
        /** PriorityResource */
        PriorityResource: {
            value: number;
            label: string;
        };
        /** UserResource */
        UserResource: {
            id: number;
            name: string;
            email: string;
        };
    };
    responses: {
        /** @description Unauthenticated */
        AuthenticationException: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    /** @description Error overview. */
                    message: string;
                };
            };
        };
        /** @description Validation error */
        ValidationException: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    /** @description Errors overview. */
                    message: string;
                    /** @description A detailed description of each field that failed validation. */
                    errors: {
                        [key: string]: string[];
                    };
                };
            };
        };
        /** @description Authorization error */
        AuthorizationException: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    /** @description Error overview. */
                    message: string;
                };
            };
        };
        /** @description Not found */
        ModelNotFoundException: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    /** @description Error overview. */
                    message: string;
                };
            };
        };
    };
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    "company.index": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Array of `CompanyResource` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["CompanyResource"][];
                    };
                };
            };
            401: components["responses"]["AuthenticationException"];
        };
    };
    "company.store": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CompanyRequest"];
            };
        };
        responses: {
            /** @description `CompanyResource` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["CompanyResource"];
                    };
                };
            };
            401: components["responses"]["AuthenticationException"];
            403: components["responses"]["AuthorizationException"];
            422: components["responses"]["ValidationException"];
        };
    };
    "company.show": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The company ID */
                company: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description `CompanyResource` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["CompanyResource"];
                    };
                };
            };
            401: components["responses"]["AuthenticationException"];
            404: components["responses"]["ModelNotFoundException"];
        };
    };
    "company.update": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The company ID */
                company: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CompanyRequest"];
            };
        };
        responses: {
            /** @description `CompanyResource` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["CompanyResource"];
                    };
                };
            };
            401: components["responses"]["AuthenticationException"];
            403: components["responses"]["AuthorizationException"];
            404: components["responses"]["ModelNotFoundException"];
            422: components["responses"]["ValidationException"];
        };
    };
    "company.destroy": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The company ID */
                company: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No content */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["AuthenticationException"];
            404: components["responses"]["ModelNotFoundException"];
        };
    };
    "deadline.index": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Array of `DeadlineResource` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["DeadlineResource"][];
                    };
                };
            };
            401: components["responses"]["AuthenticationException"];
        };
    };
    "deadline.store": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["DeadlineRequest"];
            };
        };
        responses: {
            /** @description `DeadlineResource` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["DeadlineResource"];
                    };
                };
            };
            401: components["responses"]["AuthenticationException"];
            403: components["responses"]["AuthorizationException"];
            422: components["responses"]["ValidationException"];
        };
    };
    "deadline.show": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The deadline ID */
                deadline: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description `DeadlineResource` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["DeadlineResource"];
                    };
                };
            };
            401: components["responses"]["AuthenticationException"];
            404: components["responses"]["ModelNotFoundException"];
        };
    };
    "deadline.update": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The deadline ID */
                deadline: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["DeadlineRequest"];
            };
        };
        responses: {
            /** @description `DeadlineResource` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["DeadlineResource"];
                    };
                };
            };
            401: components["responses"]["AuthenticationException"];
            403: components["responses"]["AuthorizationException"];
            404: components["responses"]["ModelNotFoundException"];
            422: components["responses"]["ValidationException"];
        };
    };
    "deadline.destroy": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The deadline ID */
                deadline: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No content */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["AuthenticationException"];
            404: components["responses"]["ModelNotFoundException"];
        };
    };
    me: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description `UserResource` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["UserResource"];
                    };
                };
            };
            401: components["responses"]["AuthenticationException"];
        };
    };
    "mypage.index": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Array of `MyPageResource` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["MyPageResource"][];
                    };
                };
            };
            401: components["responses"]["AuthenticationException"];
        };
    };
    "mypage.store": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MyPageRequest"];
            };
        };
        responses: {
            /** @description `MyPageResource` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["MyPageResource"];
                    };
                };
            };
            401: components["responses"]["AuthenticationException"];
            403: components["responses"]["AuthorizationException"];
            422: components["responses"]["ValidationException"];
        };
    };
    "mypage.create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        priorities: components["schemas"]["PriorityResource"][];
                        companies: components["schemas"]["CompanyResource"][];
                    };
                };
            };
            401: components["responses"]["AuthenticationException"];
        };
    };
    "mypage.show": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                mypage: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description マイページ情報を取得
             *
             *
             *
             *     `MyPageResource` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["MyPageResource"];
                    };
                };
            };
            401: components["responses"]["AuthenticationException"];
        };
    };
    "mypage.update": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                mypage: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MyPageRequest"];
            };
        };
        responses: {
            /** @description `MyPageResource` */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["MyPageResource"];
                    };
                };
            };
            401: components["responses"]["AuthenticationException"];
            403: components["responses"]["AuthorizationException"];
            422: components["responses"]["ValidationException"];
        };
    };
    "mypage.destroy": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                mypage: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No content */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["AuthenticationException"];
        };
    };
}
