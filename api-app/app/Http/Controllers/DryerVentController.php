<?php

namespace App\Http\Controllers;

use App\Dto\AppResponseDto;
use App\Models\DryerVent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DryerVentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json(AppResponseDto::create(
            "Dryer Vent data",
            true,
            DryerVent::paginate()
        ),200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'dryer_vent_exit_point'=>['required','string','in:0-10 Feet Off the Ground,10+ Feet Off the Ground,Rooftop'],
            'price'=>['required','numeric']
        ]);
        if($validator->fails()){
            return response()->json(AppResponseDto::create(
                $validator->errors()->first(),
                false,
                null
            ),400);
        }
        try {
            return response()->json(AppResponseDto::create(
                "Dry vent created successfully",
                true,
                DryerVent::create([
                        'dryer_vent_exit_point'=>$request->post('dryer_vent_exit_point'),
                        'price'=>$request->post('price'),
                        'created_by'=>$request->user()->id,
                        'updated_by'=>$request->user()->id
                    ]
            )),200);
        }catch (\Exception $exception){
            return response()->json(
                AppResponseDto::create(
                    $exception->getMessage(),
                    false,
                    null
                ),400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            return response()->json(AppResponseDto::create(
                "Dryer Vent data",
                true,
                DryerVent::find($id)
            ),200);
        }catch (\Exception $exception){
            return response()->json(
                AppResponseDto::create(
                    $exception->getMessage(),
                    false,
                    null
                ),400);
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $dryVent = DryerVent::find($id);
        if(!$dryVent){
            return response()->json(AppResponseDto::create(
                "Dry vent not found",
                false,
                null
            ),400);
        }
        $validator = Validator::make($request->all(),[
            'dryer_vent_exit_point'=>['required','string','in:0-10 Feet Off the Ground,10+ Feet Off the Ground,Rooftop'],
            'price'=>['required','numeric']
        ]);
        if($validator->fails()){
            return response()->json(AppResponseDto::create(
                $validator->errors()->first(),
                false,
                null
            ),400);
        }
        try {
            return response()->json(AppResponseDto::create(
                "Dry vent updated successfully",
                true,
                DryerVent::where('id',$id)->update([
                        'dryer_vent_exit_point'=>$request->post('dryer_vent_exit_point'),
                        'price'=>$request->post('price'),
                        'updated_by'=>$request->user()->id
                    ]
            )),200);
        }catch (\Exception $exception){
            return response()->json(
                AppResponseDto::create(
                    $exception->getMessage(),
                    false,
                    null
                ),400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $dryVent = DryerVent::find($id);
        if(!$dryVent){
            return response()->json(AppResponseDto::create(
                "Dry vent not found",
                false,
                null
            ),400);
        }
        try {
            DryerVent::where('id',$id)->delete();
            return response()->json(AppResponseDto::create(
                "Dryer Vent deleted successfully",
                true,
                null
            ),200);
        }catch (\Exception $exception){
            return response()->json(AppResponseDto::create(
                $exception->getMessage(),
                false,
                null
            ),400);
        }
    }
}
