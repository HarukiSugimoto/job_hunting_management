<?php

namespace App\Http\Controllers\Api;

use App\Enum\Priority;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\MyPageRequest;
use App\Http\Resources\CompanyResource;
use App\Http\Resources\MyPageResource;
use App\Http\Resources\PriorityResource;
use App\Models\Company;
use App\Models\MyPage;

class MyPageController extends Controller
{
    /**
     * MyPage.index
     * 
     * マイページ一覧を表示
     */
    public function index()
    {
        $myPages = auth()->user()->mypages();

        return MyPageResource::collection($myPages);
    }

    public function create()
    {
        $priorities = PriorityResource::collection(Priority::toArray());
        $companys = CompanyResource::collection(Company::all());
        return response()->json(['priorities' => $priorities, 'companys' => $companys], 200);
    }

    public function store(MyPageRequest $request)
    {
        // マイページ情報を作成
        $myPage = MyPage::create($request->all());

        return MyPageResource::make($myPage);
    }

    public function show(MyPage $myPage)
    {
        // マイページ情報を取得
        return MyPageResource::make($myPage);
    }

    public function update(MyPageRequest $request, MyPage $myPage)
    {
        // マイページ情報を更新
        $myPage->update($request->all());

        return MyPageResource::make($myPage);
    }

    public function destroy(MyPage $myPage)
    {
        // マイページ情報を削除
        $myPage->delete();

        return response()->noContent();
    }
}
