using System;
using System.Collections.Generic;
using System.Linq;

namespace TrabalhoRest.Models
{
    public class Pager<T> where T : class  
{  
    public IEnumerable<T> Items { get; set; }  
    public Uri NextPage { get; set; }  
    public Uri PreviousPage { get; set; }  
    public int CurrentPageNumber { get; set; }
    public int LastPageNumber { get; set; }
}  
}