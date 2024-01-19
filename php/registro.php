<?php
    include 'conexion.php';

    $nombre=$_POST['nombre'];
    $apellido=$_POST['apellido'];
    $email=$_POST['email'];

    $consulta="INSERT into usuario(nombre, apellido, email) values('$nombre','$apellido','$email')";

    $resultado=mysqli_query($conexion,$consulta);

    if($resultado){
        echo "Registro exitoso";
    }else{
        echo "Error de Registro";
    }

?>