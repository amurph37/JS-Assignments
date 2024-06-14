function outer(){

    var a = "Scope & Closure!";
    var b = { key: "Scope", nested: { innerKey: "innerClosure"} };

    console.log("Value of a in outer:", a);
    console.log("Value of b in outer:", b);

    function inner(a, b) {

        console.log("Value of a in inner:", a);
        console.log("Value of b in inner:", b);  

        a = "Updated Scope & Closure!";
        b = { newKey: "Updated Scope" };

        b.key = "Updated Scope 2";

      console.log("Updated Value of a in inner:", a);
      console.log("Updated Value of b in inner:", b);  

    }

    inner(a, b);

    console.log("Value of a after inner call:", a);
    console.log("Value of b after inner call:", b);
}

outer();