<?php

namespace App\Http\Controllers;

use App\Dto\AppResponseDto;
use App\Models\AirDuct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AirDuctController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        return response()->json(AppResponseDto::create(
            "Air duct data",
            true,AirDuct::paginate()),200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'num_furnace'=>['required','in:1,2,3+'],
            'furnace_loc_sidebyside'=>['required','numeric'],
            'furnace_loc_different'=>['required','numeric'],
            'furnace_loc_na'=>['required','numeric'],
            'square_footage_min'=>['required','numeric'],
            'square_footage_max'=>['required','numeric']
        ]);
        if($validator->fails()){
            return response()->json(
                AppResponseDto::create(
                    $validator->errors()->first(),
                    false,
                    null
                ),400);
        }
        try {
            return response()->json(AppResponseDto::create(
                "Air duct created successfully",
                true,
                AirDuct::create([
                    'num_furnace'=>$request->post('num_furnace'),
                    'furnace_loc_sidebyside'=>$request->post('furnace_loc_sidebyside'),
                    'furnace_loc_different'=>$request->post('furnace_loc_different'),
                    'furnace_loc_na'=>$request->post('furnace_loc_na'),
                    'square_footage_min'=>$request->post('square_footage_min'),
                    'square_footage_max'=>$request->post('square_footage_max'),
                    'created_by'=>$request->user()->id,
                    'updated_by'=>$request->user()->id
                ])
            ),201);
        }catch (\Exception $exception){
            return response()->json(
                AppResponseDto::create(
                    $exception->getMessage(),
                    false,
                    null
                ),500);
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
        $airDuct = AirDuct::find($id);
        if(!$airDuct){
            return response()->json(
                AppResponseDto::create(
                    "Air duct not found",
                    false,
                    null
                ),400);
        }
        try {
            return response()->json(AppResponseDto::create(
                "Air duct data",
                true,
                AirDuct::find($id)
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
        $airDuct = AirDuct::find($id);
        if(!$airDuct){
            return response()->json(
                AppResponseDto::create(
                    "Air duct not found",
                    false,
                    null
                ),400);
        }
        $validator = Validator::make($request->all(),[
            'num_furnace'=>['required','in:1,2,3+'],
            'furnace_loc_sidebyside'=>['required','numeric'],
            'furnace_loc_different'=>['required','numeric'],
            'furnace_loc_na'=>['required','numeric'],
            'square_footage_min'=>['required','numeric'],
            'square_footage_max'=>['required','numeric']
        ]);
        if($validator->fails()){
            return response()->json(
                AppResponseDto::create(
                    $validator->errors()->first(),
                    false,
                    null
                ),400);
        }
        try {
            return response()->json(AppResponseDto::create(
                "Air duct updated successfully",
                true,
                AirDuct::where('id',$id)->update([
                    'num_furnace'=>$request->post('num_furnace'),
                    'furnace_loc_sidebyside'=>$request->post('furnace_loc_sidebyside'),
                    'furnace_loc_different'=>$request->post('furnace_loc_different'),
                    'furnace_loc_na'=>$request->post('furnace_loc_na'),
                    'square_footage_min'=>$request->post('square_footage_min'),
                    'square_footage_max'=>$request->post('square_footage_max'),
                    'updated_by'=>$request->user()->id
                ])
            ),200);
        }catch (\Exception $exception){
            return response()->json(
                AppResponseDto::create(
                    $exception->getMessage(),
                    false,
                    null
                ),500);
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
        $airDuct = AirDuct::find($id);
        if(!$airDuct){
            return response()->json(
                AppResponseDto::create(
                   "Air duct not found",
                    false,
                    null
                ),400);
        }
        try {
            AirDuct::where('id',$id)->delete();
            return response()->json(AppResponseDto::create(
                "Air duct deleted successfully",
                true,
                null
            ),204);
        }catch (\Exception $exception){
            return response()->json(AppResponseDto::create(
                $exception->getMessage(),
                false,
                null
            ),400);
        }
    }
}
