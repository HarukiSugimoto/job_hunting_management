<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\CompanyRequest;
use App\Http\Resources\CompanyResource;
use App\Models\Company;

class CompanyController extends Controller
{
    /**
     * CompanyIndex
     * 
     * 企業情報を管理
     * 
     * GET /api/company
     */
    public function index()
    {
        $companies = Company::all();
        return CompanyResource::collection($companies);
    }

    /**
     * CompanyStore
     * 
     * 企業情報を管理
     * 
     * POST /api/company
     */
    public function store(CompanyRequest $request)
    {
        $company = Company::create($request->all());
        return CompanyResource::make($company);
    }
    /**
     * CompanyShow
     * 
     * 企業情報を管理
     * 
     * GET /api/company/{id}
     */
    public function show(Company $company)
    {
        return CompanyResource::make($company);
    }

    /**
     * CompanyUpdate
     * 
     * 企業情報を管理
     * 
     * PUT /api/company/{id}
     */
    public function update(CompanyRequest $request, Company $company)
    {
        $company->update($request->all());
        return CompanyResource::make($company);
    }
    /**
     * CompanyDestroy
     * 
     * 企業情報を管理
     * 
     * DELETE /api/company/{id}
     */
    public function destroy(Company $company)
    {
        $company->delete();
        return response()->noContent();
    }
}
