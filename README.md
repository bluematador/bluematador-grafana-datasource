# Blue Matador Datasource

This is a Grafana datasource for showing Blue Matador events as annotations on dashboards.

## Requirements

To use the Blue Matador Datasource, you'll need a Blue Matador account. You can sign up for a free trial at [https://app.bluematador.com/ur/register](https://app.bluematador.com/ur/register).

## Configuration

This datasource can be set up by following the instructions [in the Blue Matador App](https://app.bluematador.com/ur/app#/setup/notifications/grafana). In the configuration dialog, you'll choose which events you'd like to view as annotations in Grafana. Then, you'll create a Blue Matador datasource in Grafana by supplying your Blue Matador account ID and API Key. Finally, you'll add an annotation query to your dashboard by pasting the integration ID into the textbox. After that, you'll be able to see your automatically detected Blue Matador events in your Grafana dashboard!

If you need to change what events you can see in your dashboard, just visit the notification config page in Blue Matador and change your saved integration.
