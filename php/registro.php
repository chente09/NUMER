<?php
    include 'conexion.php';

    $nombres=$_POST['nombres'];
    $apellidos=$_POST['apellidos'];
    $email=$_POST['email'];
    $celular=$_POST['celular'];
    $direccion=$_POST['direccion'];
    $cod_postal=$_POST['cod_postal'];
    $ciudad=$_POST['ciudad'];
    $pais=$_POST['pais'];
    $comentarios=$_POST['comentarios'];



    $consulta="INSERT into usuario(nombres, apellidos, email, celular, direccion, cod_postal, ciudad, pais, comentarios)
     values('$nombres','$apellidos','$email','$celular','$direccion','$cod_postal','$ciudad','$pais','$comentarios')";

    $resultado=mysqli_query($conexion,$consulta);

    if($resultado){
        echo "Registro exitoso";
    }else{
        echo "Error de Registro";
    }

?>