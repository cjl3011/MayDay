


###tests

###types_ast 



###types



###
+ attributes  
+ builtins
+ substitution 


###infer 




def add2(x):
	return x + 2


Module
(
   body=
   [
       FunctionDef
       (
         name='add2', 

         args=arguments(args=[Name(id='x', ctx=Param(), lineno=3, col_offset=9)], vararg=None, kwarg=None, defaults=[]), 

         body=[Return(value=BinOp(left=Name(id='x', ctx=Load(), lineno=4, col_offset=8), op=Add(), right=Num(n=2, lineno=4, col_offset=12), lineno=4, col_offset=8), lineno=4, col_offset=1)], 

         decorator_list=[], lineno=3, col_offset=0
       )
   ]
)