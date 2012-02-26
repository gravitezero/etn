/*Date : 26 February 2012

On ajoute la feuille courante au mot courant.
On descend à la prochaine feuille.
Ainsi de suite jusqu'à ce qu'on tombe sur une feuille terminale.
On ajoute le mot courant au set de mot.
On prend la prochaine lettre (donc en fait, on prend la derniére lettre du mot, on prend la prochaine soeur, et ensuite on l'enléve).
Si il n'y à plus de soeur, on remonte au niveau précédent à l'aide de la dérnière lettre du mot courant.
On itére.

//%script{ :src => "/etn-theme/scripts/shCore.js", :type => "text/javascript"}*/

function Node( char letter, Node n )
{
  this.letter = letter;
  this.node_parent = n;
  this.sibling = new Node_Array(this);

  this.next_leaf = function( Node n )
  {
    if (this.sibling != nil)
      return this.sibling.next_leaf(Node n);
  }
  
  this.next_sibling = function()
  {
    return this.node_parent.next_leaf(this);
  }
  
  this.add_node = function(c)
  {
    if (this.sibling != nil)
      return this.sibling.add_node(c, this);
  }
}

function Node_Array(Node node)
{
  this.node = node;
  this.nodes = new Array();
  this.add_node = function(c, Node n)
  {
    // I should sort the array alphabetically to get names sorted
    // But let's keep it simple for the moment.
    this.nodes[this.nodes.length] = new Node(c, n);    
  }
  
  this.next_leaf = function(Node n)
  {
    for(i=0; i< this.nodes.length; ++i){
      if (this.nodes[i] == n)
        if(i != this.nodes.length-1)
          return this.nodes[i+1];
        else
          return nil;        
    }
    return nil;
  }
}

function Tree_Name()
{

  this.begin = new Node_Array(nil);

  this.add_name = function(name)
  {
    for(i=0; i < name.length; ++i){
      this.begin.add_node(name.charAt(i));
    }
  }

  this.current_word = "";
  this.names = new Array();

  this.get_names = function(Node n) {
    current_word = current_word + n.letter;
    
    if (n.next_leaf != nil){
      this.get_names(n.next_leaf);
    }
    else {
      this.names[this.names.length] = current_word;
      this.current_word = this.current_word.substring(0, this.current_word.length-2);
    }
    if (n.next_sibling != nil){
      this.get_names(n.next_sibling);
    }
  }
}