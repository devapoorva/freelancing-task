<?php

namespace App\Http\Controllers;

use App\Dto\AppResponseDto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use OpenApi\Annotations as OA;

/**
 * @OA\Info(
 *     title="Laravel API Application",
 *     version="1.0",
 *     description="API developed by Apoorva Raj",
 *     @OA\License(name="MIT")
 * )
 * * @OA\SecurityScheme(
 *     securityScheme="BearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT",
 * )
 */
class UserAuthController extends Controller
{

    /**
     * @OA\POST(
     *     path="/api/v1/login",
     *     tags={"Authentication"},
     *     summary="User Authentication",
     *     @OA\RequestBody(
     *          @OA\MediaType(mediaType="application/json",
     *              @OA\Schema(
     *                  @OA\Property(property="email", type="string", example="example@gmail.com"),
     *                  @OA\Property(property="password", type="string", example="password")
     *              )
     *          )
     *
     *     ),
     *     @OA\Response(
     *          response=200,
     *          description="Login Successful"
     *      ),
     *     @OA\Response(response=401, description="Invalid credential"),
     *     @OA\Response(response=400, description="The email | password field is required.")
     * )
     */
    public function login(Request $request){
        $validator = Validator::make($request->all(),[
           'email'=>['required','string','email'],
           'password'=>['required','string','min:6']
        ]);
        if($validator->fails()){
            return response()->json(AppResponseDto::create($validator->errors()->first(),false,null),400);
        }
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('Laravel API')->accessToken;
            return response()->json(AppResponseDto::create("Login Successful",true,$token), 200);
        }
        return response()->json(AppResponseDto::create("Invalid credential",false,null),401);
    }

    /**
     * @OA\GET(
     *     path="/api/v1/user",
     *     tags={"User"},
     *     summary="User Data",
     *     @OA\Response(
     *          response=200,
     *          description="User data"
     *      ),
     *     security={{"BearerAuth":{}}},
     *     @OA\Response(response=401, description="Invalid user")
     * )
     */
    public function user(Request $request){
        return response()->json(AppResponseDto::create("User data",true,$request->user()),200);
    }
}
