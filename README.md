# glide-datatables

## Usage
- Use the following URL in a Glide Experimental Code colum: `https://marcoprofparis.github.io/glide-datatables/`
- Display in a [WebView Component](https://www.glideapps.com/docs/reference/app-components/webview-component).

### Configuration Options

#### `table` (string, required)
* Your HTML table should be a string of data representing the table. It _must_ be structured as follows:
```
<table id="mytable">
  <thead>
    <tr><th>Name</th><th>Age</th><th>Location</th></tr>
  </thead>
  <tbody>
    <tr><td>Joe</td><td>32</td><td>Sydney</td></tr>
    <tr><td>Sarah</td><td>28</td><td>New York</td></tr>
  </tbody>
</table>
```
#### `tableID` (string, required)
* the element ID assigned to your table
#### `buttons` (string, optional)
* a single quoted comma separated list of buttons to include.
* The following are supported: `'copy','excel','pdf','print','csv','colvis'`
    * default: `null`
#### `colReorder` (boolean, optional)
* whether or not to allow column re-ordering
    * default: `false`
#### `domOptions` (string, optional)
* additional options to control the table layout. Refer to [Datatables Documentation](https://datatables.net/reference/option/dom)
    * default: `BRfrtlip`
* _NOTE: use these options with caution. Getting them wrong will break your table_
